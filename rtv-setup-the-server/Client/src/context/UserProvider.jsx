import React, {useState} from 'react'
import axios from 'axios'

const UserContext = React.createContext()

const userAxios = axios.create()

userAxios.interceptors.request.use(config => {
    const token = localStorage.getItem("token")
    config.headers.Authorization = `Bearer ${token}`
    return config
})

export default function UserProvider(props) {
    const initState = {
        user: JSON.parse(localStorage.getItem("user")) || {},
        token: localStorage.getItem("token") || "",
        posts: [],
        errMsg: ""
    }

    const [userState, setUserState] = useState(initState)
    const [postsState, setPostsState] = useState([])
    const [comments, setComments] = useState([])
    const [commentInput, setCommentInput] = useState({
        text: '',
        user: '',
        post: ''
    })

    function signup(creds) {
        axios.post("auth/signup", creds)
        .then(res => {
            const {user, token} = res.data
            localStorage.setItem("token", token)
            localStorage.setItem("user", JSON.stringify(user))
            setUserState(prevUserState => ({
                ...prevUserState,
                user,
                token
            }))
        })
        .catch(err => handleAuthErr(err.response.data.errMsg))
    }

    function login(creds) {
        axios.post("/auth/login", creds)
        .then(res => {
            const {user, token} = res.data
            localStorage.setItem("token", token)
            localStorage.setItem("user", JSON.stringify(user))
            getUserPosts()
            setUserState(prevUserState => ({
                ...prevUserState,
                user,
                token
            }))
        })
        .catch(err => handleAuthErr(err.response.data.errMsg))
    }

    function logout() {
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        setUserState({
            user: {},
            token: "",
            posts: []
        })
    }

    function handleAuthErr() {
        setUserState(prevState => ({
            ...prevState,
            errMsg: ""
        }))
    }

    function resetAuthErr() {
        setUserState(prevState => ({
            ...prevState,
            errMsg: ""
        }))
    }

    function getUserPosts() {
        userAxios.get("/api/post/user")
        .then(res => {
            setUserState(prevState => ({
                ...prevState,
                posts: res.data
            }))
        })
        .catch(err => console.log(err.response.data.errMsg))
    }

    function getAllPosts() {
        userAxios.get("/api/post")
        .then(res => {
            setPostsState(res.data)
            console.log(res.data, "hello")

        })
        .catch(err => console.log(err.response.data.errMsg))
    }

    function addPost(newPost) {
        userAxios.post("/api/post", newPost)
        .then(res => {
            setUserState(prevState => ({
                ...prevState,
                posts: [...prevState.posts, res.data]
            }))
        })
        .catch(err => console.log(err.response.data.errMsg))
    }

    // function deletePost(postId) {
    //     userAxios.delete(`/api/post/${postId}`)
    //     .then(res =>
    //         setUserState(prevState =>
    //             prevState.filter(post => post._id !== postId)   //get request
    //         )
    //     )
    //     .catch(err => console.log(err.response.data.errMsg))
    // }

    function deletePost(postId) {
        userAxios.delete(`/api/post/${postId}`)
        .then(res => {
            // Fetch updated list of posts after successful deletion
            return userAxios.get("/api/post")
                .then(response => {
                    // Update the state with the updated list of posts
                    setUserState(prevState => ({
                        ...prevState,
                        posts: response.data
                    }));
                });
        })
        .catch(err => console.log(err.response.data.errMsg));
    }

    // function editPost(postId, updates) {
    //     userAxios.put(`/api/post${postId}`, updates)
    //     .then(res =>
    //         setUserState(prevState =>
    //             prevState.map(post => post._id !== postId ? post : res.data)))
    //     .catch(err => console.log(err.response.data.errMsg))
    // }

    function editPost(postId, updates) {
        userAxios.put(`/api/post/${postId}`, updates)
        .then(res =>
            setUserState(prevState => ({
                ...prevState,
                posts: prevState.posts.map(post => post._id !== postId ? post : res.data)
            }))
        )
        .catch(err => console.log(err.response.data.errMsg))
    }

    function upVotePost(postId) {
        userAxios.put(`/api/post/upVote/${postId}`)
            .then(res => {
                setPostsState(prevPosts => prevPosts.map(post => postId !== post._id ? post : res.data))
                setUserState(prevUserState => ({
                    ...prevUserState, posts: prevUserState.posts.map(post => postId !== post._id ? post : res.data)
                }))
                console.log("hieeee", postId)
            })
            .catch(err => console.log(err))
    }

    function downVotePost(postId) {
        userAxios.put(`/api/post/downVote/${postId}`)
            .then(res => {
                setPostsState(prevPosts => prevPosts.map(post => postId !== post._id ?  post : res.data))
                setUserState(prevUserState => ({
                    ...prevUserState, posts: prevUserState.posts.map(post => postId !== post._id ? post : res.data)
                }))
            })
            .catch(err => console.log(err))
    }

    function getAllComments() {
        userAxios.get('/api/comment')
        .then(res => {
            setComments(res.data)
            //console.log('getAllCommentsFunction')
        })
        .catch ( err => console.log(err.response.data.errMsg))
    }

    function postNewComment(newComment, postId) {
        userAxios.post(`api/comment/${postId}`, newComment)
            .then(res => {
                setComments(prevComments => [...prevComments, res.data])
                //console.log('postNewCommentFunction')
            })
            .catch(err => console.log(err))
    }

    function handleChange(e) {
        const {name, value} = e.target
        setCommentInput(prevComments => ({
            ...prevComments, [name]: value
        }))
    }

    function handleSubmit(e, id) {
        e.preventDefault()
        postNewComment(commentInput, id)
        setCommentInput({
            text: '',
            user: '',
            post: id
        })
    }

    return (
    <UserContext.Provider
        value={{
            ...userState,
            signup,
            login,
            logout,
            addPost,
            resetAuthErr,
            getUserPosts,
            getAllPosts,
            postsState,
            upVotePost,
            downVotePost,
            getAllComments,
            comments,
            setComments,
            postNewComment,
            commentInput,
            handleChange,
            handleSubmit,
            editPost,
            deletePost

        }}>
        {props.children}
    </UserContext.Provider>
    )
}

export { UserProvider, UserContext }
