import {ICommentApi} from "../../types.s.ts";
import {createSlice} from "@reduxjs/toolkit";

import {RootState} from "../../app/store.ts";
import {addComment, fetchComments} from "./commentsThunks.ts";

interface commentsState {
    comments: ICommentApi[];
    fetchingLoading: boolean;
    creationLoading: boolean;
}

const initialState: commentsState = {
    comments: [],
    fetchingLoading: false,
    creationLoading: false,
}

export const selectComments = (state: RootState) => state.comments.comments;
export const selectCommentFetchingLoading = (state: RootState) => state.comments.fetchingLoading;
export const selectCommentCreationLoading = (state: RootState) => state.comments.creationLoading;

const commentsSlice = createSlice({
    name: "comments",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchComments.pending, (state) => {
                state.fetchingLoading = true;
            })
            .addCase(fetchComments.fulfilled, (state, {payload}) => {
                state.fetchingLoading = false;
                state.comments = payload;
            })
            .addCase(fetchComments.rejected, (state) => {
                state.fetchingLoading = false;
            })

            .addCase(addComment.pending, (state) => {
                state.creationLoading = true;
            })
            .addCase(addComment.fulfilled, (state) => {
                state.creationLoading = false;
            })
            .addCase(addComment.rejected, (state) => {
                state.creationLoading = false;
            })
    }
});

export const commentsReducers = commentsSlice.reducer;