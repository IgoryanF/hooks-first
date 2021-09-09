import axios from "axios";

export default class PostsService {
    static getAllPosts(limit = 10, page = 1) {
        return axios.get('https://jsonplaceholder.typicode.com/posts', {
            params: {
                _limit: limit,
                _page: page
            }
        });
    }

    static getPostById(id) {
        return axios.get('https://jsonplaceholder.typicode.com/posts/' + id);
    }

    static getCommentsByPostId(id) {
        return axios.get(`https://jsonplaceholder.typicode.com/posts/${id}/comments`);
    }
}