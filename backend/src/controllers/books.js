import models from "../models/index.js"
const { BOOK, USER } = models;

export const addBook = async (req, res) => {
    try{
        const {title, genre, author, language, pageCount, publisher} = req.body;
        const { id } = req.user;
        const book1 = await BOOK.find({ ownedBy: id, title: title });
        if(book1.length !== 0) return res.status(400).json({message: "Book already added"})
        // const picture = req.file;

        const newBook = new BOOK({
            title: title,
            genre: genre,
            author: author,
            language: language,
            pageCount: pageCount,
            ownedBy: id,
            publisher: publisher,
            tags: []
            // picture
        })

        const book = await newBook.save();
        const user = await USER.find({_id: id});
        let bookList = user[0].bookList;
        bookList.push(book._id);
        const updatedUser = await USER.findOneAndUpdate({_id: id}, {bookList: bookList})

        return res.status(201).json({message: "Book added successfully"});

    }
    catch(err){
        return res.status(500).json({error: err, message: "Error adding book"})
    }
}

export const updateBook = async (req, res) => {
    try{
        const {_id, ...details} = req.body;
        const book = await BOOK.findOneAndUpdate({_id: _id}, {details});
        return res.status(200).json({message: "Book updated successfully"});
    }
    catch(err){
        console.log(err);
        return res.status(500).json({error: err, message: "Error updating book"})
    }
}

export const deleteBook = async (req, res) => {
    try{
        const { _id } = req.query;
        const { id } = req.user;
        console.log(req.query);
        const book = await BOOK.deleteOne({_id: _id});
        const user = await USER.find({_id: id})
        let bookList = user[0].bookList;
        let booksToExchange = user[0].booksToExchange;
        booksToExchange = booksToExchange.filter((book) => {
            if(book != _id) return book;
        })
        bookList = bookList.filter((book) => {
            if(book != _id) return book;
        })
        const updatedUser = await USER.findOneAndUpdate({_id: id}, {bookList: bookList, booksToExchange: booksToExchange})
        return res.status(200).json({message: "Book deleted successfully"});
    }
    catch(err){
        console.log(err);
        return res.status(500).json({error: err, message: "Error updating book"})
    }
}

export const addBookForExchange = async (req, res) => {
    try{
        const { id } = req.user;
        const bookId = req.body.bookId;
        const user = await USER.find({ _id: id })
        let booksToExchange = user[0].booksToExchange;
        if(booksToExchange.includes(bookId)) return res.status(400).json({message: "Book already added for exchange."});
        booksToExchange.push(bookId);
        const updatedBook = await BOOK.findOneAndUpdate({_id: bookId}, {isExchange: true})
        const updatedUser = await USER.findOneAndUpdate({ _id: id }, {booksToExchange: booksToExchange});
        return res.status(200).json({message: "Book successfully added for exchange"})
    }
    catch(err){
        return res.status(500).json({error: err, message: "Error adding book for exchange"})
    }
}

export const removeBookFromExchange = async (req, res) => {
    try{
        const { id } = req.user;
        const bookId = req.body.bookId;
        const user = await USER.find({ _id: id })

        let booksToExchange = user[0].booksToExchange;
        booksToExchange = booksToExchange.filter((book) => {
            if(book != bookId) return book;
        })
        const updatedBook = await BOOK.findOneAndUpdate({_id: bookId}, {isExchange: false})
        const updatedUser = await USER.findOneAndUpdate({ _id: id }, {booksToExchange: booksToExchange});
        return res.status(200).json({message: "Book successfully removed from exchange"})
    }
    catch(err){
        return res.status(500).json({error: err, message: "Error removing book from exchange"})
    }
}