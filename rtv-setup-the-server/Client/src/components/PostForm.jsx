import React, {useContext, useState} from 'react'
import { UserContext } from '../context/UserProvider'

const initInputs = {
    title: "",
    description: ""
}

export default function PostForm(props) {
    const [inputs, setInputs] = useState(initInputs)
    const {buttonText} = props
    const {addPost} = useContext(UserContext)

    function handleChange(e) {
        const {name, value} = e.target
        setInputs(prevInputs => ({
            ...prevInputs,
            [name]: value
        }))
    }

    // function handleSubmit(e) {
    //     e.preventDefault()
    //     addPost(inputs)
    //     setInputs(initInputs)
    // }

    function handleSubmit(e) {
        e.preventDefault()
        addPost(inputs) // Pass the newPost object to addPost function
        setInputs(initInputs)
    }

    const {title, description} = inputs
    return (
        <form className='post-form' onSubmit={handleSubmit}>
            <input
                className='title'
                type="text"
                name="title"
                value={title}
                onChange={handleChange}
                placeholder="Title"
            />
            <input
                className='descript'
                type="text"
                name="description"
                value={description}
                onChange={handleChange}
                placeholder="Description"
            />
            <button className='post-btn'>{buttonText}</button>

        </form>
    )
}
