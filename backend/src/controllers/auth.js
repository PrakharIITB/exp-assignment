import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import USER from "../models/user.js";
import { ACCESS_TOKEN_SECRET, ACCESS_TOKEN_EXPIRY } from '../config/index.js';

export const register = async (req, res) => {
    try{
        const {first, last, email, password} = req.body;
        // const profilePic = req.file.filename;
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new USER({
            firstName: first,
            lastName: last,
            email: email,
            password: hashedPassword,
            // profilePic: profilePic
        })

        const user = await newUser.save();
        return res.status(201).json(user);

    }
    catch(err){
        console.log(err);
        return res.status(500).json({error: err, message: "Error creating new user"})
    }
}

export const login = async (req, res) => {
    try{
        const {email, password} = req.body;
        const user = await USER.findOne({email}).populate("bookList").populate("booksToExchange");
        if(!user) return res.status(404).json({message: "User does not exist"});
        
        const validPassword = await bcrypt.compare(password, user.password);
        if(!validPassword) return res.status(404).json({message: "Wrong password"});
        const token = jwt.sign({id: user._id}, ACCESS_TOKEN_SECRET, {expiresIn: ACCESS_TOKEN_EXPIRY})
        const userRes = {
            first: user.firstName,
            last: user.lastName,
            email: user.email,
            interests: user.interest,
            bookList: user.bookList,
            booksToExchange: user.booksToExchange
        }

        return res.status(200).json({user: userRes, token: token, message: "Login Successful"})
    
    }
    catch(err){

    }
}
