import mongoose from "mongoose";
import { type } from "os";

const USER = mongoose.model(
    "user",
    mongoose.Schema({
        firstName: String,
        lastName: String,
        profilePic: {
            type: String,
            default: ""
        },
        email: {
            type: String,
            unique: true
        },
        password: String,
        bookList: [
            {
                ref: "book",
                type: mongoose.Schema.Types.ObjectId,
                default: [],
                null: true
            }
        ],
        booksToExchange: [
            {
                ref: "book",
                type: mongoose.Schema.Types.ObjectId,
                default: [],
                null: true
            }
        ],
        interest: {
            type: [String],
            default: [],
            null: true
        }
    }),
    "user"
)

export default USER;
