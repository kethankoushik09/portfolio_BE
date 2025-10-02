import express from "express";
import { sendMail } from "../controllers/contactController.js";


const router = express.Router();

// POST route to send contact form
router.post("/", sendMail);

export default router;
