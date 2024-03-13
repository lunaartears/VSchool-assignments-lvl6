const mongoose = require('mongoose')
const express = require('express')
const commentRouter = express.Router()
const Comment = require('../models/comment.js')

// post a comment
commentRouter.post('/:postId', async (req, res, next) => {
    try {
        console.log(req.body)
        req.body.post = req.params.postId
        req.body.user = req.auth._id
        const newComment = new Comment(req.body)

        await newComment.save()
        return res.status(201).send(newComment)
    } catch (err) {
        res.status(500)
        return next(err)
    }
})

// get all comments
commentRouter.get('/', async (req, res, next) => {
    try{
        const comments = await Comment.find()
        return res.status(200).send(comments)
    } catch (err) {
        res.status(500)
        return next(err)
    }
})

module.exports = commentRouter
