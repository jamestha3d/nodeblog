const express = require('express');

const morgan = require('morgan');

const mongoose = require('mongoose');

const blogRoutes = require('./routes/BlogRoutes');

mongoose.set('strictQuery', false);
//express app
const app = express();

//Connect to Mongo DB
const dbURI = 'mongodb+srv://netninja:test1234@nodetuts.zahcddb.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true})
    .then((result) => app.listen(3000))
    .catch((err) => console.log(err))
// register view engine (for template)
app.set('view engine', 'ejs');

//if you want rename the views folder you can use this to point to the new folder
//app.set('views', 'myviews');

//listen for requests
//app.listen(3000);

//static files
/* define our static folder so that we can serve static through middleware*/
app.use(express.static('public'));

//middleware to enable us get the data in the form sent from client
//if we dont use this middleware req.body will be undefined
app.use(express.urlencoded({ extended: true }));
//Morgan Middleware 
app.use(morgan('dev'));


//mongoose and mongo sandbox routes
app.get('/add-blog', (req, res) => {
    const blog = new Blog({
        title: 'new blog 2',
        snippet: 'about my new blog 2',
        body: 'more info about the blog'
    });
    blog.save()
        .then((result) => {
            res.send(result)
        })
        .catch((err) => {
            console.log(err);
        })
});

app.get('/all-blogs', (req, res) => {
    Blog.find()
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            console.log(err);
        });
})

app.get('/single-blog', (req, res) => {
    Blog.findById('63f8685ccb18c5cff72864be')
        .then((result) => {
            res.send(result)
        })
        .catch((err) => {
            console.log(err);
        })
})


//creating custom middleware
/* we use next to tell express to move to next middleware */
/* app.use((req, res, next) => {
    console.log('new request made');
    console.log('host:', req.hostname);
    console.log('path:', req.path);
    console.log('method:', req.method);
    next();
}) */

/* app.use((req, res, next) => {
    console.log('in the next middleware');
    next();
}) */
app.get('/', (req, res) => {

    res.redirect('/blogs');
    /*const blogs = [
        {title: 'Yoshi finds eggs', snippet: 'Lorem ipsum dolor'},
        {title: 'Mario finds stars', snippet: 'Lorem ipsum dolor'},
        {title: 'How to defeat Bowser', snippet: 'Lorem ipsum dolor'},
    ];

    //express uses res.send instead of write/end etc. and no need to set headers
    //res.send('<p> home page</p>');
    //to respond with static html we use
    //res.sendFile('./views/index.html', {root: __dirname});
    //to respond with dynamic ejs we use
    res.render('index', { title: 'Home', blogs });
    */
});

app.get('/about', (req, res) => {

    //res.sendFile('./views/about.html', {root: __dirname});

    res.render('about', { title: 'About'});

    //express uses res.send instead of write/end etc. and no need to set headers
    //res.send('<p> about page</p>');
});

//blog routes. importing blogRoutes mini app
//we can scope this by adding /blogs as 1st param, now every blogRoute will come after /blogs
app.use('/blogs', blogRoutes)

//404 page should be at the bottom
//basically called if there is no match in the get methods above. 
app.use((req, res) => {
    //res.status(404).sendFile('./views/about.html', {root: __dirname});
    res.status(404).render('404', { title: 'Error'});
    //.status() returns the response object so we can chain sendFile to it. 
});