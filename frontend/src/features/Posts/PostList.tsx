import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {selectAllPost, selectFetchingLoading} from "./postsSlice.ts";
import {fetchAllPosts} from "./postsThunks.ts";
import Loader from "../../components/UI/Loader/Loader.tsx";
import PostCard from "./components/PostsCard/PostCard.tsx";

const PostList = () => {
    const dispatch = useAppDispatch();
    const allPosts = useAppSelector(selectAllPost);
    const loading = useAppSelector(selectFetchingLoading);

    useEffect(() => {
        dispatch(fetchAllPosts());
    }, [dispatch]);

    let content: React.ReactNode;

    if (loading) {
        content = (
            <div
                style={{ height: "80vh" }}
                className="d-flex align-items-center justify-content-center"
            >
                <Loader />
            </div>
        )
    }

    if (allPosts.length > 0 && !loading) {
        content = allPosts.map((post) => (

                <PostCard key={post._id} post={post}/>

        ))
    }

    return (
        <main>
            <div className="grid gap-2">
                {content}
            </div>
        </main>
    );
};

export default PostList;