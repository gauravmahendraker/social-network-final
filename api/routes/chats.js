import express from "express";
import { getChats , addChat  /*, deleteChat*/ } from "../controllers/chat.js";

const router = express.Router();

router.get("/", getChats);
 router.post("/", addChat);
// router.delete("/:id", deleteChat);

export default router;