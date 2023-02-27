/* extracted routes from App and used express router instead. 
app.get becomes router.get. then we import this mini app in app.js*/

const express = require('express');

const router = express.Router();

const Blog = require('../models/blog');


//redirects
/*app.get('/about-us', (req, res) => {
    res.redirect('/about');
});*/

//create
router.get('/create', (req, res) => {
    res.render('create', { title: 'Create'});
});


//get all blogs
router.get('/', (req, res) => {
    Blog.find().sort({ createdAt: -1})
        .then((result) => {
            res.render('index', { title: 'All Blogs', blogs: result})
        })
        .catch((err) => {
            console.log(err);
        })
})

router.post('/', (req, res) => {
    //console.log(req.body);
    //req.body is an object that contains the items we need to create the blog so we pass it in
    const blog = new Blog(req.body);

    blog.save()
        .then((result) => {
            res.redirect('/blogs');
        })
        .catch((err) => {
            console.log(err);
        })

})

router.delete('/:id', (req, res) => {
    const id = req.params.id;

    Blog.findByIdAndDelete(id)
    .then(result => {
        res.json({redirect: '/blogs'})
    })
    .catch(err => {
        console.log(err)
    })
})
//match a route param by using :
//retrieving it by using request.params.parameter
router.get('/:id', (req, res) => {
    const id = req.params.id;
    Blog.findById(id)
        .then(result => {
            res.render('details', {blog: result, title: 'Blog Details'})
        })
        .catch(err => {
            console.log(err);
        });
})

module.exports = router;