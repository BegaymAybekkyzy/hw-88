import express from "express";
import User from "../models/User";
import {Error} from 'mongoose';

const usersRouter = express.Router();

usersRouter.post("/", async (req, res, next) => {
    try {
        const existingUser = await User.findOne({username: req.body.username});

        if (existingUser) {
            res.status(400).send({error: `The user '${req.body.username}' already exists`});
            return;
        }

        if (!req.body.password || !req.body.username) {
            res.status(400).send({error: "Fill in the required fields"});
        }

        const newUser = new User({
            username: req.body.username,
            password: req.body.password,
        });

        newUser.generateToken();
        newUser.save();
        res.send(newUser);
    } catch (err) {
        if (err instanceof Error.ValidationError || err instanceof Error.CastError) {
            res.status(400).send(err);
            return;
        }
        next(err);
    }
});

usersRouter.post("/sessions", async (req, res, next) => {
    try {
        const user = await User.findOne({username: req.body.username});

        if (!user) {
            res.status(400).send({error: "Invalid password or username"});
            return;
        }

        const isMatch = await user.checkPassword(req.body.password);

        if (!isMatch) {
            res.status(400).send({error: "Invalid password or username"});
            return;
        }

        user.generateToken();
        await user.save();
        res.send({message: "Username and password correct", user});
    } catch (err) {
        next(err);
    }
});

usersRouter.delete('/sessions', async (req, res, next) => {
    const token = req.get('Authorization');

    if (!token) {
        res.send({message: "Success logout"});
        return;
    }

    try {
        const user = await User.findOne({token});

        if (user) {
            user.generateToken();
            await user.save();
        }

        res.send({message: "Success logout"});
    } catch (err) {
        next(err);
    }
});

export default usersRouter;