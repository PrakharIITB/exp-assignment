import express from "express";
import cors from "cors";
import http from "http";
import connect from "./config/connect.js";
import multer from "multer"
import { register } from "./controllers/auth.js";
import { PORT } from './config/index.js';
import bookRoutes from './routes/books.js'
import authRoutes from './routes/auth.js'
import userRoutes from './routes/user.js'

connect();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/");
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});

const upload = multer({storage: storage})
const app = express();
app.use(express.raw({ type: ['application/pdf', 'text/plain', 'audio/webm'], limit: "20mb"}))
app.use(express.json({limit: "10mb"}));
app.use(express.urlencoded({limit: "10mb", extended: true}));

app.use(cors({
    origin: ["https://exp-assignment.vercel.app"],
    credentials: true
}))

app.use('/api/register', upload.single('profile'), register)
app.use('/api/login', authRoutes)
app.use('/api/user', userRoutes)
app.use('/api/book', bookRoutes)
// app.use('/api/books', bookRoutes)

app.listen(PORT, () => console.log(`PORT: ${PORT}`));
