import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosAPI from "../../axiosAPI.ts";
import {IError, IPostApi, IPostForm} from "../../types.s.ts";
import {RootState} from "../../app/store.ts";
import {isAxiosError} from "axios";

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

export const fetchPostByID = createAsyncThunk<IPostApi, string>(
    "posts/fetchPostByID",
    async (id) => {
       try {
           const response = await axiosAPI(`posts/${id}`);
           return response.data;
       }catch (err) {
           console.error(err)
       }
    }
);

export const createPost = createAsyncThunk<
    void,
    IPostForm,
    { state: RootState, rejectValue: IError }
>(
    "posts/createPost",
    async (newPost, thunkAPI) => {
        try {
            const token = thunkAPI.getState().users.user?.token;
            const formData = new FormData();
            const keys = Object.keys(newPost) as (keyof IPostForm)[];

            keys.forEach(key => {
                const value = newPost[key] as string;
                if (value !== null) {
                    formData.append(key, value);
                }
            });

            await axiosAPI.post("posts", formData, {headers: {Authorization: `Bearer ${token}`}});
        }catch (err) {
            if (isAxiosError(err) && err.response && err.response.status === 401) {
                return thunkAPI.rejectWithValue(err.response.data);
            }

            throw err;
        }
    }
)