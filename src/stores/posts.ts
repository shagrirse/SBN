// Create a pinia vue store
import { defineStore } from 'pinia'
type User = {
    id: number
    first_name: string
    last_name: string
}
type Post = {
    id: number
    title: string
    body: string
    user: User
    created_at: string
}

export const usePostsStore = defineStore('posts', {
    state: () => ({
        posts: [] as Post[],
    }),
    getters: {
        getPosts(): Post[] {
            return this.posts
        },
    },
    actions: {
        async initializePosts() {
            const response = fetch(`${import.meta.env.VITE_FASTIFY}/api/posts`, {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Access-Control-Allow-Credentials': 'true',
                },
            })
                .then(response => response.json())
                .then(posts => {
                    const data: Post[] = posts.data
                    // Sort posts by date and adjust timezone from UTC to local (i.e. UTC+8)
                    const sortedPosts = data.sort((a, b) => {
                        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
                    })
                    this.posts = sortedPosts.map((post) => {
                        return {
                            ...post,
                            created_at: new Date(post.created_at).toLocaleString(),
                        }
                    })
                });
            return response
        },
        clearPosts() {
            this.posts = []
        },
    },
})
