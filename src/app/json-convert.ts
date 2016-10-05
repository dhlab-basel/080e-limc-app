export function JsonObject(target: any) {
    target["__jsonconvert__mapping__"] = [];
}

export function JsonProperty(jsonKey: string, type: any): any {

    return function (target: any, key: string) {

        if (typeof(target["__jsonconvert__mapping__"]) === "undefined") {
            target["__jsonconvert__mapping__"] = [];
        }

        target["__jsonconvert__mapping__"][key] = {
            "jsonKey": jsonKey,
            "type": type
        };

    }
}

/**
 * Offers a simple API for mapping json objects to JavaScript classes.
 */
export class JsonConvert {

    /**
     * Determines whether debugging info is shown in console.
     */
    public static debug: boolean = false;

    /**
     * Tries to deserialize a json object to a JavaScript class.
     * @param classObject the class object
     * @param json the json object
     * @returns the deserialized object
     * @throws an exception in case of failure
     */
    public static deserializeObject(json: Object, classObject: { new(): any }): any {

        if (JsonConvert.debug) {
            console.log("----------");
            console.log("Receiving JSON object:");
            console.log(json);
        }

        let classInstance = new classObject();

        // Loop through all (not undefined) class properties
        for (const propertyKey of Object.keys(classInstance)) {
            JsonConvert.deserializeObject_loopProperty(classInstance, propertyKey, json);
        }

        if (JsonConvert.debug) {
            console.log("Returning CLASS instance:");
            console.log(classInstance);
            console.log("----------");
        }

        return classInstance;
    }

    /**
     * Tries to deserialize a json object property to a JavaScript class.
     * @param classInstance the instance of the class
     * @param propertyKey the property
     * @param json the json object
     */
    private static deserializeObject_loopProperty(classInstance: any, propertyKey: string, json: Object): void {

        // Get the mapping array
        let mapping = classInstance["__jsonconvert__mapping__"];


        // Check if a object-json mapping is possible for a property
        if (JsonConvert.deserializeObject_propertyHasDecorator(mapping, propertyKey) === false) {
            classInstance[propertyKey] = json[propertyKey];
            return;
        }


        // Get expected and real values
        let jsonKey: string = mapping[propertyKey]["jsonKey"];
        let expectedType: any = mapping[propertyKey]["type"];

        let jsonValue: any = json[jsonKey];


        // Check if the json value exists
        if (typeof(jsonValue) === "undefined") {
            throw new Error(
                "Fatal error in JsonConvert.\n" +
                "Failed to map the json object to the class \"" + classInstance.constructor.name + "\" because the defined json property \"" + jsonKey + "\" does not exist:\n\n" +
                "\tClass property: " + propertyKey + "\n" +
                "\tJson property: " + jsonKey
            );
        }


        // Map the property
        JsonConvert.deserializeObject_mapProperty(classInstance, propertyKey, expectedType, jsonValue);

    }


    /**
     * Check if a class property has a decorator.
     * @param mapping the class-json mapping array
     * @param propertyKey the property key
     * @returns true if the mapping exists, otherwise false
     */
    private static deserializeObject_propertyHasDecorator(mapping: any, propertyKey: string): boolean {
        return typeof(mapping) !== "undefined" && typeof(mapping[propertyKey]) !== "undefined";
    }


    /**
     *
     * @param classInstance the instance of the class
     * @param propertyKey the property
     * @param expectedType the expected type for the property indicated in the decorator
     * @param jsonValue the json object for the given property
     * @returns returns true on success, throws an exception otherwise
     * @throws throws an expection in case of failure
     */
    private static deserializeObject_mapProperty(classInstance: any, propertyKey: string, expectedType: any, jsonValue: any): boolean {

        // Check if it the attempt was 1-d
        if (expectedType instanceof Array === false && jsonValue instanceof Array === false) {

            if (
                (expectedType === String && typeof(jsonValue) === "string") ||
                (expectedType === Number && typeof(jsonValue) === "number") ||
                (expectedType === Boolean && typeof(jsonValue) === "boolean")
            ) {
                classInstance[propertyKey] = jsonValue;
                return true;
            } else if (expectedType.hasOwnProperty("__jsonconvert__mapping__")) {
                classInstance[propertyKey] = JsonConvert.deserializeObject(jsonValue, expectedType);
                return true;
            }

            throw("bla1");

        }

        // Check if it the attempt was n-d
        if (expectedType instanceof Array && jsonValue instanceof Array) {

            classInstance[propertyKey] = [];

            // No data given, so return empty value
            if (jsonValue.length === 0) {
                return true;
            }

            // We obviously don't care about the type, so return the json value as is
            if (expectedType.length === 0) {
                classInstance[propertyKey] = jsonValue;
                return true;
            }

            // Loop through the data
            let autofillType: boolean = expectedType.length === 1;
            for (let i = 0; i < jsonValue.length; i++) {

                if (autofillType) expectedType[i] = expectedType[0];

                if (expectedType[i] === undefined) {
                    classInstance[propertyKey][i] = jsonValue[i];
                } else if (
                    (expectedType[i] === String && typeof(jsonValue[i]) === "string") ||
                    (expectedType[i] === Number && typeof(jsonValue[i]) === "number") ||
                    (expectedType[i] === Boolean && typeof(jsonValue[i]) === "boolean")
                ) {
                    classInstance[propertyKey][i] = jsonValue[i];
                } else if (expectedType[i].hasOwnProperty("__jsonconvert__mapping__")) {
                    classInstance[propertyKey][i] = JsonConvert.deserializeObject(jsonValue[i], expectedType[i]);
                } else {
                    throw("bla2");
                }
            }

            return true

        }

    }


    /*


    private static getPropertyAsString(expectedType: any): string {




        return "";
    }

    private static deserializeObject_mapProperty(classInstance: any, key: string, json: Object) {

        console.log("---------");

        let mapping = classInstance["mapping"];

        let jsonValue;
        let expectedType;
        let expectedSubtype;
        let jsonKey;


        // Check if decorator has been used
        if (typeof(mapping[key]) === "undefined") { // Decorator not used

            // Get the value directly from the json key
            jsonValue = json[key];

            // The key does not exist in the json neither
            if (typeof(jsonValue) === "undefined") return;

            classInstance[key] = jsonValue;
            return;

        } else { // The decorator used, probably undefined type

            jsonKey = mapping[key]["jsonKey"];
            jsonValue = json[jsonKey];
            expectedType = mapping[key]["type"];
            expectedSubtype = mapping[key]["subtype"];

            if (typeof(jsonValue) === "undefined") {
                throw new Error(
                    "Fatal error in JsonConvert.\n" +
                    "Failed to map the json object to the class \"" + classInstance.constructor.name + "\" because the defined json property \"" + jsonKey + "\" does not exist:\n\n" +
                    "\tClass property: " + key + "\n" +
                    "\tJson property: " + jsonKey
                );
            }

        }


        // Get the type of the json value
        let jsonType = typeof(jsonValue);


        // Verify if we have an allowed type and subtype
        if (JsonConvert.isExpectedTypeValid(expectedType) === false) {
            throw new Error(
                "Fatal error in JsonConvert. Your chosen expected type is not allowed:\n\n" +
                "\tClass property: " + key + "\n" +
                "\tExpected type: " + expectedType + "\n" +
                "\tJson property: " + jsonKey + "\n" +
                "\tJson type: " + jsonType
            );
        }
        if (expectedType === Array && JsonConvert.isExpectedTypeValid(expectedSubtype) === false) {
            throw new Error(
                "Fatal error in JsonConvert. Your chosen expected subtype is not allowed:\n\n" +
                "\tClass property: " + key + "\n" +
                "\tExpected type: " + expectedType + "\n" +
                "\tJson property: " + jsonKey + "\n" +
                "\tJson type: " + jsonType
            );
        }


        console.log("KEY: " + key);
        console.log(expectedType);
        console.log(typeof(jsonValue));
        console.log(jsonValue instanceof Array);
        console.log('----');


        // Check if we have type checking disabled or flat types match immediately
        if (expectedType === "undefined" || JsonConvert.primitiveTypesMatch(expectedType, jsonType)) {
            classInstance[key] = jsonValue;
            return;
        }

        // Check if we have a custom object. Careful, in JS an array is also an object
        if (JsonConvert.customObjectMatch(expectedType, jsonType, jsonValue)) {
            console.log("Custom Object");
            //Object.create(window[expectedType].prototype);
            //console.log(newClass);
            //classInstance[key] = JsonConvert.deserializeObject(expectedType, jsonValue);
            return;
        }

        // Check if we have an array
        if (JsonConvert.arrayMatch(expectedType, jsonType, jsonValue)) {
            classInstance[key] = jsonValue;
            return;
        }

        throw new Error(
            "Fatal error in JsonConvert. Expected type does not match type in JSON:\n\n" +
            "\tClass property: " + key + "\n" +
            "\tExpected type: " + expectedType + "\n" +
            "\tJson property: " + jsonKey + "\n" +
            "\tJson type: " + jsonType
        );

    }*

    private static deserializeObject_mapProperty2(classInstance: any, key: string, json: Object) {



    }


    // boolean number string array[] tuple [string, number], enum, any, void, null, undefined, never


    private static primitiveTypes = ["string", "number", "boolean", "symbol"]; // undefined, null

    private static primitiveTypesMatch(expectedType, jsonType) {
        return (JsonConvert.isPrimitive(jsonType) && expectedType === jsonType)
    }

    private static isPrimitive(value: string) {
        return (JsonConvert.primitiveTypes.indexOf(value) >= 0);
    }

    private static customObjectMatch(expectedType: string, jsonType: string, jsonValue: any) {
        return (
            JsonConvert.isPrimitive(expectedType) === false &&
            expectedType.indexOf("Array") === -1 &&
            jsonType === "object" &&
            jsonValue instanceof Array === false
        );
    }

    private static arrayMatch(expectedType: any, jsonType: string, jsonValue: any) {
        return (
            ( expectedType.indexOf("[]") >= 0 || expectedType.indexOf("Array") >= 0 ) &&
            jsonType === "object" &&
            jsonValue instanceof Array
        );
    }

    private static isExpectedTypeValid(type: any) {
        console.log(type);
        console.log(typeof(type));
        return false;
    }*/

}