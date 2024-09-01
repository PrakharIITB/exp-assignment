import mongoose from "mongoose";
import { MONGO_URI, DB_NAME } from "./index.js";


mongoose.set("strictQuery", false);

export default async function connect(){
    try {
        await mongoose.connect(MONGO_URI, {
            dbName: DB_NAME
        });
        console.log(`Mongo ☑️`)
        console.log("Server connected")

    }
    catch(err) {
        console.log(`Mongo ☠️`);
        console.log(err)
        process.exit(1);
    }
}