import models from "../models/index.js"

const { BOOK, USER, REQUEST } = models;

export const addInterest = async (req, res) => {
    try {
        const {interests} = req.body;
        const { id } = req.user;
        const user = await USER.findOneAndUpdate({_id: id}, {interest: interests})   
        return res.status(200).json({data: user.interest, message: "Interests updated successfully"})      
    } catch (error) {
        console.log(error);
        return res.status(500).json({error: error, message: "Error updating interests"})      
    }
}

export const getBookForExchange = async (req, res) => {
    try{
        const { id } = req.user;
        const books = await BOOK.find({isExchange: true, ownedBy: {$ne: id}}).populate('ownedBy');
        return res.status(200).json({data: books, message: "Books retrieved successfully"})
    }
    catch(err){
        console.log(err);
        return res.status(500).json({error: err, message: "Books cannot be retrieved"})
    }
}

export const getMyBookForExchange = async (req, res) => {
    try{
        const { id } = req.user;
        const books = await BOOK.find({ ownedBy: id, isExchange: true })
        return res.status(200).json({data: books, message: "Books retrieved successfully"})
    }
    catch(err){
        console.log(err);
        return res.status(500).json({error: err, message: "Books cannot be retrieved"})
    }
}

export const getMyBooks = async (req, res) => {
    try {
        const { id } = req.user;
        const user = await USER.find({ _id: id }).populate("bookList");
        return res.status(200).json({data: user[0].bookList, message: "Books retrieved successfully"})
    } catch (error) {
        console.log(error);
        return res.status(500).json({error: error, message: "Books cannot be retrieved"})
    }
}

export const getPossibleMatch = async (req, res) => {
    try {
        const { id } = req.user;
        const user = await USER.findOne({_id: id});
        const interests = user.interest;
        if(interests.length === 0) return res.status(400).json({message: "No interests mentioned"});
        const regexFilters = interests.map((interest) => RegExp(interest, 'i'))

        const matchingBooks = await BOOK.find({
            isExchange: true,
            ownedBy: {$ne: id},
            $or: [
                {genre: {$in: regexFilters}},
                {author: {$in: regexFilters}},
                {title: {$in: regexFilters}},
                {language: {$in: regexFilters}},
                {publisher: {$in: regexFilters}}
            ]
        }).populate('ownedBy')

        let possibleExchanges = {};
        for(let book of matchingBooks){
            const ownedBy = book.ownedBy;
            const interests1 = ownedBy.interest;
            console.log(interests1);
            const regexFilters1 = interests1.map((interest) => RegExp(interest, 'i'));
            
            const matchingBooks1 = await BOOK.find({
                ownedBy: id,
                isExchange: true,
                $or: [
                    {genre: {$in: regexFilters1}},
                    {author: {$in: regexFilters1}},
                    {title: {$in: regexFilters1}},
                    {language: {$in: regexFilters1}},
                    {publisher: {$in: regexFilters1}}
                ]
            })
            if(matchingBooks1.length > 0){
                if(possibleExchanges[ownedBy.email] !== undefined){
                    possibleExchanges[ownedBy.email].booksIn.push(book);
                }
                else{
                    possibleExchanges = { ...possibleExchanges, 
                        [ownedBy.email]:{
                        ownerName: ownedBy.firstName +" "+ ownedBy.lastName,
                        booksOut: matchingBooks1,
                        booksIn: [book]}
                    }
                }
            }
        }
        return res.status(200).json({data: possibleExchanges, message: "Req Successfull"})
    } catch (error) {
        console.log(error);
        return res.status(500).json({error: error})
    }
}

export const initiateRequest = async (req, res) => {
    try{
        const { id } = req.user;
        const {requestTo, bookIn, bookOut} = req.body;
        const request = await REQUEST.find({
            from: id,
            to: requestTo,
            bookIn: bookIn,
            bookOut: bookOut,
        })
        const request1 = await REQUEST.find({
            to: id,
            from: requestTo,
            bookOut: bookIn,
            bookIn: bookOut,
        })
        if(request.length !== 0 || request1.length !== 0) return res.status(400).json({message: "Request already exists"})
        const newRequest = new REQUEST({
            from: id,
            to: requestTo,
            bookIn: bookIn,
            bookOut: bookOut,
            status: "pending"
        })
        const request3 = await newRequest.save();
        return res.status(200).json({message: "Request initiated successfully"})
    }
    catch(err){
        console.log(err);
        return res.status(500).json({error: err, message: "Request initiation failed"})
    }
}

export const rejectRequest = async (req, res) => {
    try{
        const id = req.params;
        const request = await REQUEST.findOneAndUpdate({_id: id}, {status: "rejected"});
        return res.status(200).json({message: "Request rejected"});
    }
    catch(err){
        console.log(err);
        return res.status(500).json({error: err, message: "Request rejection failed"})
    }
}

export const acceptRequest = async (req, res) => {
    try{
        const { _id } = req.body;
        const request = await REQUEST.findOneAndUpdated({_id}, {status: "accepted"});
        const bookOut = await BOOK.findOneAndUpdate({_id: request.bookIn}, {ownedBy: request.from});
        const bookIn = await BOOK.find({_id: request.bookOut}, {ownedBy: request.to});
        return res.status(200).json({message: "Request Accepted"});
    }
    catch(err){
        console.log(err);
        return res.status(500).json({error: err, message: "Request Accept failed"})
    }
}

export const getUser = async (req, res) => {
    try {
        const { id } = req.user;
        const user = await USER.find({_id: id}).populate('bookList').populate('booksToExchange');
        return res.status(200).json({data: user, message: "User retrieved successfully"})
    } catch (error) {
        console.log(error);
        return res.status(500).json({error: error, message: "Request failed"})
    }
}

export const getRequests = async (req, res) => {
    try {
        const { id } = req.user;
        const requests = await REQUEST.find({ to: id }).populate('from').populate('to').populate('bookIn').populate('bookOut');
        return res.status(200).json({data: requests, message: "Requests retrieved successfully"})
    } catch (error) {
        console.log(error);
        return res.status(500).json({error: error, message: "Request failed"})
    }
}