import express from "express";
import { verifyToken } from "../middleware/auth.js";
import {
  addInterest,
  getBookForExchange,
  getPossibleMatch,
  getMyBookForExchange,
  initiateRequest,
  rejectRequest,
  acceptRequest,
  getMyBooks,
  getUser,
  getRequests,
} from "../controllers/user.js";

const router = express.Router();

router.post("/addInterest", verifyToken, addInterest);
router.get("/getExchangeBooks", verifyToken, getBookForExchange);
router.get("/getRequest", verifyToken, getPossibleMatch);
router.get("/getMyBookForExchange", verifyToken, getMyBookForExchange);
router.get("/getMyBooks", verifyToken, getMyBooks);
router.get("/possibleMatches", verifyToken, getPossibleMatch);
router.get("/getRequests", verifyToken, getRequests);
router.post("/initiateRequest", verifyToken, initiateRequest);
router.delete("/rejectRequest", verifyToken, rejectRequest);
router.post("/acceptRequest", verifyToken, acceptRequest);
router.get("/", verifyToken, getUser);

export default router;
