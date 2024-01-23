//Express App #6 course

const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');

const blogRouters = require('./routes/blogRoutes');



//express app : set up a express instance
const app = express();

//connection to mongodb
const dbURL = 'mongodb+srv://prjNode:ninja1234@cluster0.xvcoyoc.mongodb.net/node-ninja'
mongoose.connect(dbURL)
    .then(() => app.listen(3000))
    .catch((err) => console.log(err));
//register view engine: To send dynamic data into the html file.
//#7 course 
app.set('view engine', 'ejs');//it will automatically look into the the views file
// app.set('view', 'myviews'); it you put you html in other folder use and also give it the name of your folder




//3rd party middleware example "morgan": HTTP request logger middleware for node.js
// app.use(morgan('dev'));

//middleware & static files( styles, photos) that public to the brower
app.use(express.static('public'));

//post
app.use(express.urlencoded({ extended: true}));
//next()
// app.use((req, res, next) => {
//     console.log('new requst made');
//     next();//next() can help you to run the following code, or you will hanging there if you use the use();
// });

//mongoose and mongo snadbox routes
app.get('/add-blog', (req, res) => {
    
    const blog = new Blog({
        title: 'Anita is the best girlfriend ever',
        snippet: 'about anita',
        body: 'She is the cutest girl in the world and I love her so much.'
    });

    blog.save()
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            console.log(err);
        });
})

app.get('/all-blogs', (req, res) => {
    Blog.find()
    .then((result) => {
        res.send(result);
    })
    .catch((err) => {
        console.log(err);
    })
})

//get method to get request from the brower and response to it, it's follow the order of your code.
app.get('/', (req, res) => {
    res.redirect('/blogs');
    // const blogs = [
    //     {title: 'Yoshi finds eggs', snippet: 'Lorem ipsum dolor sit amet consectetur'},
    //     {title: 'Mario finds stars', snippet: 'Lorem ipsum dolor sit amet consectetur'},
    //     {title: 'How to defeat bowser', snippet: 'Lorem ipsum dolor sit amet consectetur'},
    //   ];
    //res.send('<p>hoME PAGE</P>'); //single line of html
    //res.sendFile('./views/index.html', {root: __dirname}); // html file, the {root: __dirname} is the relative root for the path( option parametar)
    //res.render('index', {title: 'Home', blogs}); //ejs

}); 

app.get('/about', (req, res) => {
   
    //res.send('<p>hoME PAGE</P>');
    //res.sendFile('./views/about.html', {root: __dirname});
    res.render('about', {title: 'About'}); //ejs

});

//blogs
app.use('/blogs', blogRouters);




//redirects
// app.get('/about-us', (req, res) => {
//     res.redirect('/about');
// })


//404 page
//use method is the mothed will be implement if no get method matched. It is the last thing to do in the code, 
//so you should put it in the last in the code
app.use((req, res) => {
    //res.status(404).sendFile('./views/404.html', {root: __dirname})
    res.status(404).render('404', {title: '404'}); //ejs
})