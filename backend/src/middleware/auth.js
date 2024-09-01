import jwt from 'jsonwebtoken';
import { ACCESS_TOKEN_SECRET } from "../config/index.js"

export const verifyToken = async (req, res, next) => {
    try{
        let token = req.header('Authorization');
        if(!token) return res.status(401).json({message: "Token not found"});
        token = token.slice(7, token.length).trimLeft();
        const verified = jwt.verify(token, ACCESS_TOKEN_SECRET);
        req.user = verified;
        next();
    }
    catch(err){
        console.log(err);
        res.status(500).json({error: err});
    }
}