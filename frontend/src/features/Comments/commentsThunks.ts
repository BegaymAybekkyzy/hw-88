import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosAPI from "../../axiosAPI.ts";
import {ICommentApi, ICommentForm} from "../../types.s.ts";
import {RootState} from "../../app/store.ts";

export const fetchComments = createAsyncThunk<ICommentApi[], string>(
    "comments/fetchComments",
    async (postId) => {
       try {
           const response = await axiosAPI(`comments?post=${postId}`)
           return response.data;
       }catch (error) {
           console.log(error)
       }
    }
);

export const addComment = createAsyncThunk<
    void,
    ICommentForm,
    { state: RootState }
>(
    "comments/addComment",
    async (newComm, thunkAPI) => {
        try {
            const token = thunkAPI.getState().users.user?.token;

            await axiosAPI.post("comments", newComm, {headers: {Authorization: `Bearer ${token}`}});
        }catch (err) {
            console.log(err)
        }
    }
)