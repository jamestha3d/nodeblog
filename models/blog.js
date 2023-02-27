const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const blogSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    snippet: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    }
}, {timestamps: true});

//model name has to be singular version of the collection name in our database on mongodb
//on mongodb we used blogs so here we use Blog
const Blog = mongoose.model('Blog', blogSchema);
module.exports = Blog;