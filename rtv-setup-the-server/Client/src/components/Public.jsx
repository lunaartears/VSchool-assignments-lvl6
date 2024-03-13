import React, { useContext, useEffect } from 'react'
import PostList from './PostList.jsx'
import { UserContext } from '../context/UserProvider.jsx'

export default function Public() {
    const {
            getAllPosts,
            postsState,
    } = useContext(UserContext)

    useEffect(() => {
        getAllPosts()
        console.log(postsState, 'publicPage')
    }, []);

console.log(postsState)
    return (
        <div className='public'>
            <h1>All Posts</h1>
            <PostList posts={postsState}/>
        </div>
    )
}
