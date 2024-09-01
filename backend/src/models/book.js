import mongoose from "mongoose";

const BOOK = mongoose.model(
    "book",
    mongoose.Schema({
        title: String,
        genre: String,
        author: String,
        language: String,
        pageCount: Number,
        publisher: String,
        tags: {
            type: [String],
            default: [],
        },
        picture: {
            type: String,
            default: ""
        },
        ownedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user'
        },
        isExchange: {
            type: Boolean,
            default: false
        }
    }),
    "book"
)

export default BOOK;