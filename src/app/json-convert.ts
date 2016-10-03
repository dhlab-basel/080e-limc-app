export class JsonConvert {

    public static deserializeObject<T>(classObject: { new(): T }, json: Object): T {

        console.log("Receiving JSON object:")
        console.log(json);


        let classInstance: T = new classObject();

        for (const key of Object.keys(classInstance)) {
            //if (typeof json[key] === 'undefined') continue;

            console.log("Assigning: " + key + " = " + json[key]);
            console.log("JsonProperty " + classInstance["mapping"][key]);
            classInstance[key] = json[classInstance["mapping"][key]];
        }

        console.log("Returning CLASS instance:");
        console.log(classInstance);

        return classInstance;
    }

}