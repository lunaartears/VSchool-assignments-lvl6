import React, {useContext, useState} from 'react'
import {UserContext} from '../context/UserProvider.jsx'

export default function CommentForm(props) {
    const {postNewComment, comment, handleChange, handleSubmit} = useContext(UserContext)
    const {id} = props





    return (
        <form onSubmit={(e) => handleSubmit(e, id)}>
            <input
            className='comment-input'
            type='text'
            name='text'
            value={comment}
            placeholder='comment'
            onChange={handleChange}

            />
            <button className='submit-comment-btn'>Submit Comment</button>
        </form>


    )
}
