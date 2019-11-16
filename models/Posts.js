const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create database schema
const postSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    postBody: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        dafault: Date.now
    }

});

module.exports = Post = mongoose.model('post', postSchema);