import express from "express";
import Post from "../models/Post";
import {Error} from "mongoose";
import authentication, {RequestWithUser} from "../middleware/authentication";
import {imagesUpload} from "../middleware/multer";

const postsRouter = express.Router();

postsRouter.post("/", authentication, imagesUpload.single("image"), async (req, res, next) => {
    try {
        const user = (req as RequestWithUser).user;

        if (!user) {
            res.status(401).send({error: "User not found"});
        }

        if (!req.file && !req.body.description) {
            res.status(404).send({error: "Fill in the image or description field"});
        }

        const newPost = new Post({
            user: user._id,
            title: req.body.title,
            description: req.body.description,
            image: req.file ? "images/" + req.file.filename : null,
            datetime: new Date().toISOString(),
        });

        await newPost.save();
        res.send(newPost);
    } catch (err) {
        if (err instanceof Error.ValidationError || err instanceof Error.CastError) {
            res.status(400).send(err);
            return;
        }
        next(err);
    }
});

postsRouter.get("/", async (req, res, next) => {
    try {
        const allPosts = await Post.find()
            .select("-description")
            .sort({datetime: -1})
            .populate({
                path: "user",
                select: "username",
            });
        res.send(allPosts);
    } catch (err) {
        next(err);
    }
});

postsRouter.get("/:id", async (req, res, next) => {
    try {
        const {id} = req.params;
        const post = await Post.findOne({_id: id});

        if (!post) {
            res.status(404).send({error: "Post not found"});
            return;
        }

        res.send(post);
    } catch (err) {
        if (err instanceof Error.ValidationError || err instanceof Error.CastError) {
            res.status(400).send(err);
            return;
        }
        next(err);
    }
});

export default postsRouter;