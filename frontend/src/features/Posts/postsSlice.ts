import {IPostApi} from "../../types.s.ts";
import {createSlice} from "@reduxjs/toolkit";
import {createPost, fetchAllPosts, fetchPostByID} from "./postsThunks.ts";
import {RootState} from "../../app/store.ts";

interface postState {
    allPosts: IPostApi[];
    postById: IPostApi | null;
    fetchingLoading: boolean;
    creationLoading: boolean;
}

const initialState: postState = {
    allPosts: [],
    postById: null,
    fetchingLoading: false,
    creationLoading: false,
}

export const selectAllPost = (state: RootState) => state.posts.allPosts;
export const selectPost = (state: RootState) => state.posts.postById;
export const selectFetchingLoading = (state: RootState) => state.posts.fetchingLoading;
export const selectCreationLoading = (state: RootState) => state.posts.creationLoading;

const postsSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllPosts.pending, (state) => {
                state.fetchingLoading = true;
            })
            .addCase(fetchAllPosts.fulfilled, (state, {payload}) => {
                state.fetchingLoading = false;
                state.allPosts = payload;
            })
            .addCase(fetchAllPosts.rejected, (state) => {
                state.fetchingLoading = false;
            })

            .addCase(fetchPostByID.pending, (state) => {
                state.fetchingLoading = true;
            })
            .addCase(fetchPostByID.fulfilled, (state, {payload}) => {
                state.fetchingLoading = false;
                state.postById = payload;
            })
            .addCase(fetchPostByID.rejected, (state) => {
                state.fetchingLoading = false;
            })

            .addCase(createPost.pending, (state) => {
                state.creationLoading = true;
            })
            .addCase(createPost.fulfilled, (state) => {
                state.creationLoading = false;
            })
            .addCase(createPost.rejected, (state) => {
                state.creationLoading = false;
            })
    }
});

export const postsReducers = postsSlice.reducer;