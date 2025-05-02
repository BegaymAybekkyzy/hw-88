import React, {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {fetchPostByID} from "./postsThunks.ts";
import {useParams} from "react-router-dom";
import {selectPost, selectPostFetchingLoading} from "./postsSlice.ts";
import Loader from "../../components/UI/Loader/Loader.tsx";
import dayjs from "dayjs";
import {BASE_URL} from "../../constants.ts";
import {fetchComments} from "../Comments/commentsThunks.ts";
import {selectCommentFetchingLoading, selectComments} from "../Comments/commentsSlice.ts";
import CommentCard from "../Comments/components/CommentCard/CommentCard.tsx";
import {Box} from "@mui/material";
import CommentForm from "../Comments/components/CommentForm/CommentForm.tsx";
import {selectUser} from "../Users/userSlice.ts";

const PostDetail = () => {
    const dispatch = useAppDispatch();
    const loading = useAppSelector(selectPostFetchingLoading);
    const post = useAppSelector(selectPost);
    const user = useAppSelector(selectUser);
    const comments = useAppSelector(selectComments);
    const commentLoading = useAppSelector(selectCommentFetchingLoading);
    const {id} = useParams();

    useEffect(() => {
        if (!id) return;
        dispatch(fetchPostByID(id));
        dispatch(fetchComments(id))
    }, [dispatch, id]);

    let content: React.ReactNode;
    let imagePath: string | null = null;

    if (!post) return;

    if (post.image) {
        imagePath = BASE_URL + post.image;
    }

    if (loading) {
        content = (
            <div
                style={{height: '80vh'}}
                className="d-flex align-items-center justify-content-center"
            >
                <Loader/>
            </div>
        );
    }

    if (post) {
        content = (
            <>
                <h1 className="mb-3">{post.title}</h1>
                <span className="d-block mb-5 text-secondary fst-italic">
          At {dayjs(post.datetime).format('DD.MM.YYYY HH:mm')}
        </span>
                <div className="mb-3 w-25">
                    {post.image && (<img src={imagePath} alt={post.title} className="d-block w-100 h-auto"/>)}
                </div>
                <p>{post.description}</p>
            </>
        );
    }

    let commentContent: React.ReactNode;

    if (commentLoading) {
        commentContent = (
            <div
                style={{height: '80vh'}}
                className="d-flex align-items-center justify-content-center"
            >
                <Loader/>
            </div>
        );
    }

    if (comments.length > 0 && id) {
        commentContent = (
            <>
                {comments.map((comment) => (
                    <CommentCard
                        key={id}
                        comment={comment}
                    />
                ))}
            </>
        );
    }

    if (comments.length === 0) {
        commentContent = <p>No comments</p>;
    }

    return (
        <main>
            {content}
            <hr/>
            <Box marginBottom={3}>
                <h2>Comments</h2>
                <div className="overflow-x-auto" style={{maxHeight: '30vh'}}>
                    {commentContent}
                </div>
            </Box>

            <div className="mb-5">

                {user ? (
                        <>
                            <h3>Add new comment</h3>
                            <CommentForm postId={id}/>
                        </>
                    )
                    : null
                }
            </div>
        </main>
    );
};

export default PostDetail;