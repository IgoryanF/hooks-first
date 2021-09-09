import React, {useEffect, useState} from 'react';
import {useFetching} from "../hooks/useFetching";
import PostsService from "../API/PostsService";
import MyLoader from "../components/UI/loader/MyLoader";
import {useParams} from "react-router-dom";

const Post = () => {

    const params = useParams();

    const [post, setPost] = useState({});

    const [comments, setComments] = useState([]);

    const [fetchPost, isPostLoading, postError] = useFetching(async (id) => {
        const response = await PostsService.getPostById(id);
        setPost(response.data);
    })

    const [fetchComments, isCommentsLoading, commentsError] = useFetching(async (id) => {
        const response = await PostsService.getCommentsByPostId(id);
        setComments(response.data);
    })

    useEffect(() => {
        fetchPost(params.id);
        fetchComments(params.id);
    }, []);

    return (
        <div>
            {isPostLoading
                ? <MyLoader/>
                : <h1> Номер поста: {post.id}, title: {post.title}</h1>
            }
            <h1>Комментарии</h1>
            {isCommentsLoading
                ? <MyLoader/>
                : <div>
                    {comments.map(com =>
                        <div key={com.id}>
                            <h5>{com.email}</h5>
                            <div>{com.body}</div>
                        </div>
                    )}
                </div>
            }
        </div>
    );
};

export default Post;