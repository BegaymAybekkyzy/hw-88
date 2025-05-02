import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosAPI from "../../axiosAPI.ts";
import {IPostApi, IPostForm} from "../../types.s.ts";

export const fetchAllPosts = createAsyncThunk<
    IPostApi[],
    void
>(
    "posts/fetchAllPosts",
    async () => {
        try {
            const response = await axiosAPI("posts");
            return response.data;
        }catch (err) {
            console.error(err)
        }
    }
);

export const fetchPostByID = createAsyncThunk<
    IPostApi,
    string
>(
    "posts/fetchPostByID",
    async (id) => {
       try {
           const response = await axiosAPI(`posts/${id}`)
           return response.data;
       }catch (err) {
           console.error(err)
       }
    }
);

export const createPost = createAsyncThunk<
    void,
    IPostForm
>(
    "posts/createPost",
    async (newPost) => {
        try {
            const formData = new FormData();
            const keys = Object.keys(newPost) as (keyof IPostForm)[];

            keys.forEach(key => {
                const value = newPost[key] as string;
                if (value !== null) {
                    formData.append(key, value);
                }
            });

            await axiosAPI.post("posts", formData);
        }catch (err) {
            console.error(err)
        }
    }
)