import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import router from "./src/routes/contact.js";


dotenv.config();
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/contact", router);

app.get("/",(req,res)=>{
  res.send("kethan gaikwad");
  
})

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
