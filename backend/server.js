//use for "type": "module"
import express from "express";
// same as line above but is different package.json "type": "commonjs"
// const express = require("express"); 

const app = express();

app.get("/api/notes", (req, res) => {
    res.send(req.ip)
});

app.listen(5001, () => {
    console.log("this is running")
});