import express from "express";
import cors from "cors";
import usersRouter from "./routers/users";
import postsRouter from "./routers/posts";
import commentsRouter from "./routers/comments";
import mongoose from "mongoose";
import config from "./config";
import path from "node:path";

const app = express();
const port = 8000;

app.use(express.json());
app.use(cors());
app.use("/users", usersRouter);
app.use("/posts", postsRouter);
app.use("/comments", commentsRouter);
app.use('/images', express.static(path.join(config.publicPath, 'images')));

const run = async () => {
    await mongoose.connect(config.db)

    app.listen(port, () => {
        console.log(`Server started on http://localhost:${port}`);
    });

    process.on("exit", () => {
        mongoose.disconnect();
    });
}

run().catch(console.error);