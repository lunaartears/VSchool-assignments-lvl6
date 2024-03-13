import React from 'react'
import Post from './Post.jsx'

export default function PostList(props) {
    const {posts} = props
    //console.log(posts)
    return (
        <div className='post-list'>
            {posts.map(post => <Post {...post} key={post._id}/>)}

        </div>
    )
}
