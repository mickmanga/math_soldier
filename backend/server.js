const app = require("express")();
const https = require("https");
const express = require("express");

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // Change '*' to your domain for better security
  res.header("Access-Control-Allow-Methods", "GET, POST");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use(express.json());

app.get("/", (req, res) => {
  res.send("thanks");
});

app.get("/ok", (req, res) => {
  res.send("there you go");
})

app.listen(3000, () => console.log("app running"));
