import express from "express";
import { sendMail2 } from "../controllers/contactController2.js";


const router = express.Router();

// POST route to send contact form
router.post("/", sendMail2);

export default router;
