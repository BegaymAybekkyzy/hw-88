import express from "express";
import Comment from "../models/Сomment";
import authentication, {RequestWithUser} from "../middleware/authentication";
import {Error} from "mongoose";

const commentsRouter = express.Router();

commentsRouter.post("/", authentication, async (req, res, next) => {
    try {
        const user = (req as RequestWithUser).user;
        const {post, text} = req.body;

        const newComment = new Comment({
            user: user._id,
            post,
            text,
        });

        await newComment.save();
        res.send(newComment);
    } catch (err) {
        if (err instanceof Error.ValidationError || err instanceof Error.CastError) {
            res.status(400).send(err);
            return;
        }

        next(err);
    }
});

commentsRouter.get("/", async (req, res, next) => {
    try {
        const {post} = req.query;
        let filter = {};

        if (post) {
            filter = {post}
        }

        const comments = await Comment.find(filter);
        res.send(comments);

    } catch (err) {
        if (err instanceof Error.ValidationError || err instanceof Error.CastError) {
            res.status(400).send(err);
            return;
        }
        next(err);
    }
});

export default commentsRouter;