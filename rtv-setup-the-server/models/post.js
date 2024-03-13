const mongoose = require('mongoose')
const Schema = mongoose.Schema

const postSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    datePosted: {
        type: Date,
        default: Date.now
    },
    likedUsers: [{
        type: Schema.Types.ObjectId,
        ref: "user"
    }],
    dislikedUsers: [{
        type: Schema.Types.ObjectId,
        ref: "user"
    }]

})


module.exports = mongoose.model("Post", postSchema)
