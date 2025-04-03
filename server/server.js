import express from "express";
import dotenv from "dotenv";
import logger from "./utils/logger.js";
import mongoose from "mongoose";
import cors from "cors";
import authRouter from "./routes/auth.router.js";
import clubRouter from "./routes/club.router.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/api/auth', authRouter);
app.use('/api/club', clubRouter);

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(process.env.PORT, () => logger("info",`Server connected to database and running on port: ${process.env.PORT}`))
    })
    .catch((err) => logger("error", err))
