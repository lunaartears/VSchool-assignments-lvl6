import React, {useState, useContext} from 'react'
import AuthForm from './AuthForm.jsx'
import {UserContext} from '../context/UserProvider.jsx'

const initInputs = {username: "", password: ""}

export default function Auth() {
    const [inputs, setInputs] = useState(initInputs)
    const [toggle, setToggle] = useState(false)

    const {signup, login, errMsg, resetAuthErr} = useContext(UserContext)

    function handleChange(e) {
        const {name, value} = e.target
        setInputs(prevInputs => ({
            ...prevInputs,
            [name]: value
        }))
    }

    function handleSignup(e) {
        e.preventDefault()
        signup(inputs)
    }

    function handleLogin(e) {
        e.preventDefault()
        login(inputs)
    }

    function toggleForm() {
        setToggle(prev => !prev)
        resetAuthErr()
    }

    return (
        <div className='signin-page'>
            <h1>Political Topics Site</h1>
            <h1 className='topics-text'>Welcome! Log in or sign up to post and comment</h1>
            {!toggle ?
                <>
                    <AuthForm
                        handleChange={handleChange}
                        handleSubmit={handleSignup}
                        inputs={inputs}
                        btnText="Sign up"
                        errMsg={errMsg}
                    />
                    <p className="auth-text" onClick={toggleForm}>Log in</p>
                </>
            :
            <>
                <AuthForm
                    handleChange={handleChange}
                    handleSubmit={handleLogin}
                    inputs={inputs}
                    btnText="Log in"
                    errMsg={errMsg}
                />
                <p className="auth-text" onClick={toggleForm}>Sign up</p>
            </>
        }
        </div>
    )
}
