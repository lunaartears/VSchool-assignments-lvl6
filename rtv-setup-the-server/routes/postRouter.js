const express = require("express")
const mongoose = require("mongoose")
const postRouter = express.Router()
const Post = require('../models/post.js')

//get all posts
postRouter.get("/", async (req, res, next) => {
    try {
        const posts = await Post.find()
        return res.status(200).send(posts)
    } catch (err) {
        res.status(500)
        return next(err)
    }
})

//get posts by user id
postRouter.get("/user", async (req, res, next) => {
    try {
        const UserPosts = await Post.find({ user: req.auth._id })
        return res.status(200).send(UserPosts)
    } catch (err) {
        res.status(500)
        return next(err)
    }
})

//add new post
postRouter.post("/", async (req, res, next) => {

    try {
        console.log(req.body)
        console.log(req.body.user)
        req.body.user = req.auth._id

        const newPost = new Post(req.body)
        const savedPost = await newPost.save()
        return res.status(201).send(savedPost)
    } catch (err) {
        res.status(500)
        return next(err)
    }

})

//delete post
postRouter.delete("/:postId", async (req, res, next) => {
    try {
        const deletedPost = await Post.findOneAndDelete(
            { _id: req.params.postId, user: req.auth._id }
        )
        return res.status(200).send(`Successfully deleted ${deletedPost.title} from the database`)
    } catch (err) {
        res.status(500)
        return next(err)
    }
})

//update post
postRouter.put("/:postId", async (req, res, next) => {
    try {
        const updatedPost = await Post.findOneAndUpdate(
            { _id: req.params.postId, user: req.auth._id },
            req.body,
            { new: true }
        )
        return res.status(201).send(updatedPost)
    } catch (err) {
        res.status(500)
        return next(err)
    }
})

//upvote a post
postRouter.put('/upVote/:postId', async (req, res, next) => {
    try {
        const updatedUpVote = await Post.findOneAndUpdate(
            { _id: req.params.postId },
            {
                $addToSet: { likedUsers: req.auth._id },
                $pull: { dislikedUsers: req.auth._id }
            },
            { new: true }
        )

                return res.status(201).send(updatedUpVote)


        } catch (err) {
            res.status(500)
            return next(err)

}})

//downvote a post
postRouter.put('/downVote/:postId', async (req, res, next) => {
    try {
const updatedDownVote = await Post.findOneAndUpdate(
        { _id: req.params.postId },
        {
            $addToSet: { dislikedUsers: req.auth._id },
            $pull: { likedUsers: req.auth._id }
        },
        { new: true }
)

            return res.status(201).send(updatedDownVote)
    } catch (err) {
        res.status(500)
        return next(err)
    }

})

module.exports = postRouter
