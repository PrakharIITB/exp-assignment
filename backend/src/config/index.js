import dotenv from "dotenv"
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename);

dotenv.config({ path:__dirname+'/./../../.env'});

export const DB_NAME = process.env.DB_NAME;
export const MONGO_URI = process.env.MONGO_URI;
export const ACCESS_TOKEN_EXPIRY = process.env.ACCESS_TOKEN_EXPIRY;
export const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
export const GEN_SALT_ROUNDS = process.env.GEN_SALT_ROUNDS;
export const PORT = process.env.PORT;