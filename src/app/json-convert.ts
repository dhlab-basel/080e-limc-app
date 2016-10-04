export class JsonConvert {


    public static deserializeObject<T>(classObject: { new(): T }, json: Object): T {

        console.log("Receiving JSON object:")
        console.log(json);


        let classInstance: T = new classObject();

        let mapping = classInstance["mapping"];

        for (const key of Object.keys(classInstance)) {

            console.log("---------");

            let jsonValue;
            let expectedType;
            let jsonKey;

            // Check if decorator has been used
            if (typeof(mapping[key]) === "undefined") { // Decorator not used

                // The key does not exist in the json neither
                if (typeof(json[key]) === undefined) continue;

                jsonKey = key;
                jsonValue = json[key];
                expectedType = "undefined";

            } else { // The decorator used, probably undefined type

                jsonKey = mapping[key]["jsonKey"];
                jsonValue = json[jsonKey];
                expectedType = mapping[key]["type"];

            }

            // Get the type of the json value
            let jsonType = typeof(jsonValue);

            console.log("KEY: " + key);
            console.log(expectedType);
            console.log(typeof(jsonValue));
            console.log(jsonValue instanceof Array);
            console.log('----');


            // Check if we have type checking disabled or flat types match immediately
            if (expectedType === "undefined" || JsonConvert.primitiveTypesMatch(expectedType, jsonType)) {
                classInstance[key] = jsonValue;
                continue;
            }

            // Check if we have a custom object. Careful, in JS an array is also an object
            if (JsonConvert.customObjectMatch(expectedType, jsonType, jsonValue)) {
                console.log("Custom Object");
                //Object.create(window[expectedType].prototype);
                //console.log(newClass);
                //classInstance[key] = JsonConvert.deserializeObject(newClass, jsonValue);
                continue;
            }

            // Check if we have an array
            if (JsonConvert.arrayMatch(expectedType, jsonType, jsonValue)) {
                classInstance[key] = jsonValue;
                continue;
            }

            throw new Error(
                "Fatal error in JsonConvert. Expected type does not match type in JSON:\n\n" +
                "\tClass property: " + key + "\n" +
                "\tExpected type: " + expectedType + "\n" +
                "\tJson property: " + jsonKey + "\n" +
                "\tJson type: " + jsonType);

        }

        console.log("Returning CLASS instance:");
        console.log(classInstance);

        return classInstance;
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

    private static arrayMatch(expectedType: string, jsonType: string, jsonValue: any) {
        return (
            ( expectedType.indexOf("[]") >= 0 || expectedType.indexOf("Array") >= 0 ) &&
            jsonType === "object" &&
            jsonValue instanceof Array
        );
    }

}