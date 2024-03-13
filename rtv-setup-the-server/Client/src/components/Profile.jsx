import React, {useContext, useEffect, useState} from 'react'
import PostForm from './PostForm.jsx'
import PostList from './PostList.jsx'
import Post from './Post.jsx'
import {UserContext} from '../context/UserProvider.jsx'

export default function Profile(props) {
    const {
        user: {
            username
        },
        addPost,
        posts,
        getUserPosts,
        deletePost,
        editPost
    } = useContext(UserContext)

    const {title, description, _id} = props

useEffect(() => {
    getUserPosts()
}, [])
console.log(posts)
return (
    <div className='profile'>

            <h1>Hello @{username}</h1>
            <h3>Add a Post</h3>
            <PostForm buttonText={"Add Post"} addPost={addPost}/>
            <h2>Your Posts</h2>
            <PostList posts={posts}/>

    </div>
    )
}
