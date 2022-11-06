import express from "express";
import { suggest} from "../controllers/suggestions.js";

const router = express.Router()

router.get("/", suggest)

export default router