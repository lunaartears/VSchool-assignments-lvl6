import React, {useContext, useEffect} from 'react'
import {UserContext} from '../context/UserProvider'
import Comment from './Comment'

export default function CommentList(props) {
    const {getAllComments, comment} = useContext(UserContext)
    const {filteredComments} = props
    console.log(filteredComments)

    useEffect(() => {
        getAllComments()
    }, [])

    return (
        <div className='comment-list'>
            {filteredComments.map(comment => <Comment {...comment} key={comment._id}/>)}
        </div>
    )
}
