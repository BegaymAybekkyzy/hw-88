import {IError, IPostApi} from "../../types.s.ts";
import {createSlice} from "@reduxjs/toolkit";
import {createPost, fetchAllPosts, fetchPostByID} from "./postsThunks.ts";
import {RootState} from "../../app/store.ts";

interface postState {
    allPosts: IPostApi[];
    postById: IPostApi | null;
    fetchingLoading: boolean;
    creationLoading: boolean;
    error: IError | null;
}

const initialState: postState = {
    allPosts: [],
    postById: null,
    fetchingLoading: false,
    creationLoading: false,
    error: null,
}

export const selectAllPost = (state: RootState) => state.posts.allPosts;
export const selectPost = (state: RootState) => state.posts.postById;
export const selectPostFetchingLoading = (state: RootState) => state.posts.fetchingLoading;
export const selectPostCreationLoading = (state: RootState) => state.posts.creationLoading;

const postsSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllPosts.pending, (state) => {
                state.fetchingLoading = true;
                state.error = null;
            })
            .addCase(fetchAllPosts.fulfilled, (state, {payload}) => {
                state.fetchingLoading = false;
                state.allPosts = payload;
                state.error = null;
            })
            .addCase(fetchAllPosts.rejected, (state) => {
                state.fetchingLoading = false;
                state.error = null;
            })

            .addCase(fetchPostByID.pending, (state) => {
                state.fetchingLoading = true;
            })
            .addCase(fetchPostByID.fulfilled, (state, {payload}) => {
                state.fetchingLoading = false;
                state.error = null;
                state.postById = payload;
            })
            .addCase(fetchPostByID.rejected, (state) => {
                state.fetchingLoading = false;
                state.error = null;
            })

            .addCase(createPost.pending, (state) => {
                state.creationLoading = true;
                state.error = null;
            })
            .addCase(createPost.fulfilled, (state) => {
                state.creationLoading = false;
                state.error = null;
            })
            .addCase(createPost.rejected, (state, {payload}) => {
                state.creationLoading = false;
                state.error = payload || null;
            })
    }
});

export const postsReducers = postsSlice.reducer;