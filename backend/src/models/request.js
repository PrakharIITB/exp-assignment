import mongoose from "mongoose";

const REQUEST = new mongoose.model(
    "request",
    mongoose.Schema({
        from: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user'
        },
        to: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user'
        },
        bookOut: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'book'
        },
        bookIn: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'book'
        },
        status: String
    }),
    "request"
)

export default REQUEST;
