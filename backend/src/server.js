//use for "type": "module"
import express from "express";
// same as line above but is different package.json "type": "commonjs"
// const express = require("express"); 

import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "../config/db.js";
import dotenv from "dotenv";

dotenv.config();
//console.log(process.env.MONGO_URI);

const app = express();
const port = process.env.PORT || 5001

connectDB();

//middleware that breakes down the request into json
app.use(express.json());
app.use("/api/notes", notesRoutes);




app.listen(port, () => {
    console.log(`this is running on port: ${port}`)
});