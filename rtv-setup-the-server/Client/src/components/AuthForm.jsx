import React from 'react'

export default function AuthForm(props) {
    const {
        handleChange,
        handleSubmit,
        btnText,
        errMsg,
        inputs: {
            username,
            password
        }
    } = props


return (
    <form className='auth-form' onSubmit={handleSubmit}>
        <input
            className='username'
            type="text"
            value={username}
            name="username"
            onChange={handleChange}
            placeholder="Username"
        />
        <input
            className='password'
            type="text"
            value={password}
            name="password"
            onChange={handleChange}
            placeholder="Password"
        />
        <button className='auth-btn'>{btnText}</button>
        <p className='err-msg'>{errMsg}</p>
    </form>
)
}
