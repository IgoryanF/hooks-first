import {useState} from "react";

export const useFetching = (callback) => {

    const [isPostsLoading, setIsPostsLoading] = useState(false);
    const [error, setError] = useState('');

    async function fetchPosts(...args) {
        try {
            setIsPostsLoading(true);
            await callback(...args);
        } catch (e) {
            setError(e.message)
        } finally {
            setIsPostsLoading(false);
        }
    }

    return [fetchPosts, isPostsLoading, error];
}