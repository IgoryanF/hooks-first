import {useEffect, useRef, useState} from "react";
import {useFetching} from "../hooks/useFetching";
import PostsService from "../API/PostsService";
import {getPageCount} from "../components/utils/pages";
import {usePosts} from "../hooks/usePosts";
import MyButton from "../components/UI/button/MyButton";
import MyModal from "../components/UI/modal/MyModal";
import PostForm from "../components/PostForm";
import PostFilter from "../components/PostFilter";
import PostList from "../components/PostList";
import Pagination from "../components/UI/pagination/Pagination";
import MyLoader from "../components/UI/loader/MyLoader";
import {useObserver} from "../hooks/useObserver";


function Posts() {

    const [posts, setPosts] = useState([]);

    const [filter, setFilter] = useState({ sort: '', query: '' });

    const [modalActive, setModalActive] = useState(false);

    const [totalPages, setTotalPages] = useState(0);

    const [limit, setLimit] = useState(10);

    const [page, setPage] = useState(1);

    const [fetchPosts, isPostsLoading, error] = useFetching(async (limit, page) => {
        const response = await PostsService.getAllPosts(limit, page);
        setPosts([...posts, ...response.data]);
        const totalCount = response.headers['x-total-count'];
        setTotalPages(getPageCount(totalCount, limit));
    });

    const lastElement = useRef();

    useObserver(lastElement, page < totalPages, isPostsLoading, () =>
        setPage(page + 1)
    )

    useEffect(() => {
        fetchPosts(limit, page).then();
    },[page]);

    const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);

    const createPost = (newPost) => {
        setPosts([...posts, newPost]);
        setModalActive(false);
    }

    const removePost = (post) => {
        setPosts(posts.filter(p => p.id !== post.id));
    }

    const changePage = (page) => {
        setPage(page);
    }

    return (
        <div className="App">
            <MyButton onClick={() => setModalActive(true)}>Создать пост</MyButton>
            <MyModal active={modalActive} setActive={setModalActive}>
                <PostForm create={createPost}/>
            </MyModal>
            <hr style={{margin: '15px 0'}}/>
            <PostFilter filter={filter} setFilter={setFilter}/>
            {error &&
                <h1>Произошла ошибка {error}</h1>
            }
            <PostList remove={removePost} posts={sortedAndSearchedPosts} title={"Список постов"}/>
            <div ref={lastElement}/>
            {isPostsLoading &&
                <div className="center"><MyLoader/></div>
            }

            <Pagination totalPages={totalPages} page={page} changePage={changePage}/>

        </div>
    );
}

export default Posts;