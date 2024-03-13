import React, {useState, useContext} from 'react'
import { UserContext } from '../context/UserProvider'

export default function LikeButton(props) {


    const {upVotePost, downVotePost} = useContext(UserContext)

    function upVote() {
        upVotePost(props.id)
    }
    //console.log(props)
    return (
        <div>
            <button className='like-btn' onClick={upVote}>Like</button>
            <button className='dislike-btn' onClick={() => downVotePost(props.id)}>Dislike</button>

        </div>
    )
}
