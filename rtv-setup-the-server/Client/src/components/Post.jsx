import React, {useContext, useState} from 'react'
import LikeButton from './LikeButton'
import CommentList from './CommentList.jsx'
import PostForm from './PostForm.jsx'
import {UserContext} from '../context/UserProvider'
import CommentForm from './CommentForm.jsx'

export default function Post(props) {
    const {title, description, likedUsers, dislikedUsers, _id} = props
    const {comments, editPost, deletePost, addPost} = useContext(UserContext)
    const [editToggle, setEditToggle] = useState(false)

    const filteredComments = comments.filter(comment => comment.post === _id)

    //console.log(props)
    return (
        <div className='post'>

            { !editToggle ?
            <>
                <h1>{title}</h1>
                <h3>- {description}</h3>
                <h3> Likes: {likedUsers.length}</h3>
                <h3> Dislikes: {dislikedUsers.length}</h3>
                <LikeButton id={_id}/>
                <CommentForm id={_id}/>
                <CommentList filteredComments={filteredComments}/>
                <button onClick={() => deletePost(_id)}>Delete Post</button>
                <button onClick={() => setEditToggle(prevToggle => !prevToggle)}>Edit Post</button>
            </>
            :
            <>
                <PostForm
                    title={title}
                    description={description}
                    _id= {_id}
                    submit={editPost}             
                    buttonText="Submit Edit"
            />
                <button onClick={() => setEditToggle(prevToggle => !prevToggle)}>Close Edit</button>
        </>

            }

        </div>
    )
}
