const express = require("express");
const dotenv = require("dotenv");
const logger = require("pino")();
const cors = require("cors");
const expressSession = require("express-session");
const proxy = require("express-http-proxy");

const app = express();
dotenv.config();

// Middleware
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());
app.set("trust proxy", 1);

const sessSettings = expressSession({
  secret: "oursecret",
  resave: true,
  saveUninitialized: true,
  cookie: {
    secure: false, // For development, you can set it to true in production if using HTTPS
    maxAge: 360000,
  },
});
app.use(sessSettings);

// Proxy middleware
app.use("/user", proxy("http://localhost:4000"));
app.use("/course", proxy("http://localhost:8080"));
app.use("/order", proxy("http://localhost:8000"));import express, { Request, Response } from "express";
import dotenv from "dotenv";
import pino from "pino";
import cors from "cors";
import expressSession from "express-session";
import proxy from "express-http-proxy";

const logger = pino();
const app = express();
dotenv.config();

// Middleware
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());
app.set("trust proxy", 1);

const sessSettings = expressSession({
  secret: "oursecret",
  resave: true,
  saveUninitialized: true,
  cookie: {
    secure: false, // For development, you can set it to true in production if using HTTPS
    maxAge: 360000,
  },
});
app.use(sessSettings);

// Proxy middleware
app.use("/user", proxy("http://localhost:4000"));
app.use("/course", proxy("http://localhost:8080"));
app.use("/order", proxy("http://localhost:8000"));
app.use("/notification", proxy("http://localhost:8080"));

// Sample route to check if the gateway is running
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({ message: "Gateway Server is running!" });
});

const PORT: number = Number(process.env.PORT) || 3001;
app.listen(PORT, () => {
  logger.info(`Gateway Server is running on PORT: ${PORT}`);
});

app.use("/notification", proxy("http://localhost:8080"));

// Sample route to check if the gateway is running
app.get("/", (req, res) => {
  res.status(200).json({ message: "Gateway Server is running!" });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  logger.info(`Gateway Server is running on PORT: ${PORT}`);
});
