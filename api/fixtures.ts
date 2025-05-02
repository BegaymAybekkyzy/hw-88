import mongoose from "mongoose";
import config from "./config";
import User from "./models/User";
import Post from "./models/Post";
import Comment from "./models/Сomment";

const run = async () => {
    await mongoose.connect(config.db);
    const db = mongoose.connection;

    try {
        await db.dropCollection("users");
        await db.dropCollection("posts");
        await db.dropCollection("comments");
    } catch (err) {
        console.log(err);
    }

    const [user1, user2] = await User.create(
        {
            username: "Bob",
            password: "123",
            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODE0YzYxODgyMWQ2MGQwNWYwODMwMzMiLCJpYXQiOjE3NDYxOTI5MjYsImV4cCI6MTc3NzcyODkyNn0.0yNe8VSL8h70cYcJaJ_ZnN3EiPFEkH_3H_o616j3K54",
        },
        {
            username: "Hoho",
            password: "123",
            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODE0YzY0NTk5MDQ0MzA4NWFkNzU3YjkiLCJpYXQiOjE3NDYxOTIwMDEsImV4cCI6MTc3NzcyODAwMX0.mQ18NQfGzpSDxCPPkuHD5vUYL2xPFgXOv1-9BHPFnR8"
        },
    );

    const [post1, post2] = await Post.create(
        {
            user: user1._id,
            title: "Post test",
            description: "Test description",
            image: "images/6414ecd0-c387-4ce5-8df3-c26ddaac21a4.jpeg",
            datetime: new Date("2025-05-02T15:14:33.587Z")
        },
        {
            user: user2._id,
            title: "Test 2",
            description: "Lorem",
            image: null,
            datetime: new Date("2025-05-02T15:17:44.343Z")
        }
    );

    await Comment.create(
        {
            user: user1._id,
            post: post1._id,
            text: "Test comment",
        },
        {
            user: user2._id,
            post: post1._id,
            text: "Test comment 2",
        },
        {
            user: user1._id,
            post: post2._id,
            text: "Hello",
        },
        {
            user: user2._id,
            post: post2._id,
            text: "Boba hi",
        }
    )

    await db.close();
}

run().catch(console.error);