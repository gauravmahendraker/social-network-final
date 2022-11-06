import express from "express";
import { getFrnds} from "../controllers/friends.js";

const router = express.Router()

router.get("/", getFrnds)

export default router