import express from "express";
import { verifyToken } from "../middleware/auth.js";
import { addBook, addBookForExchange, deleteBook, removeBookFromExchange, updateBook } from "../controllers/books.js";


const router = express.Router();

router.post("/", verifyToken, addBook)
router.put("/", verifyToken, updateBook)
router.delete("/", verifyToken, deleteBook)
router.post("/addExchange", verifyToken, addBookForExchange)
router.post("/removeExchange", verifyToken, removeBookFromExchange)

export default router;