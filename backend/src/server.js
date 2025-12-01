//use for "type": "module"
import express from "express";
// same as line above but is different package.json "type": "commonjs"
// const express = require("express");
import "dotenv/config";
//import dotenv from "dotenv";
//dotenv.config();
import cors from "cors";

import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "../config/db.js";
import ratelimiter from "../middleware/rateLimiter.js";

const app = express();
const port = process.env.PORT || 5001;

//middleware that breakes down the request into json
app.use(express.json());
//example of custom middleware
app.use((req, res, next) => {
    console.log(`req method ${req.method}, to req url ${req.url}`), next();
});

//added rateLimiter before routes
app.use(ratelimiter);
app.use(
    cors({
        origin: "http://localhost:5173",
    })
);

//add the nodesRoutes to the api
app.use("/api/notes", notesRoutes);

//Connect to database, then start the connection in express
connectDB().then(() => {
    app.listen(port, () => {
        console.log(`this is running on port: ${port}`);
    });
});
