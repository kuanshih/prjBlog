//server #5course
//install npm
//For anyone having issues because running scripts on your system is disabled: 1) Open Powershell as admin. 
//2) Type "Set-executionpolicy unrestricted" and answer yes to make the changes. 
//3) type "get-executionpolicy" to ensure it's been changed to unrestricted.

const http = require('http');
const fs = require('fs');
const _ = require('lodash');


//create the server
const server = http.createServer((req, res) => {
    //console.log(req.url, req.method);

    //lodash: a external node package that you can use in node.js 1)npm install lodash 2)const _=require('lodash');
    const num = _.random(0,20);
    console.log(num);

    const greet =_.once(() => {
        console.log('hello')
    });

    greet();
    greet();
    //set header content type
    res.setHeader('content-type', 'text/html'); //send text: text/plain ; send html: text/html

    //send text
    // res.write('hello world');
    // res.end();

    //send an html
    // res.write('<p>good morning</p>');
    // res.end();

    //set the path as a variable, then the user can go to different pages
    let path = './views/';
    switch(req.url) {
        case '/':
            path += 'index.html';
            res.statusCode = 200;
            break;
        case '/about':
            path += 'about.html';
            res.statusCode = 200;
            break;
        case '/about-me':
            res.statusCode = 301;
            res.setHeader('Location', '/about');//redirect to about page
            res.end();
            break;
        default:
            path +='404.html';
            res.statusCode = 404;
            break;
    }

    //send an html file
    fs.readFile(path, (err, data) => {
        if(err){
            console.log(err);
        }
        else {
            //res.write(data);
            res.end(data);
        }
    })
})

server.listen(3000, 'localhost', () =>{
    console.log('listening for requests on port 3000');
})


//when you send your code to your colleuge or put it onto gitHub, it won't contain the package you installed.
//If you downlaod the code and run it directly, it will occur error because you havn't download the packages.
//So you should type" npm instll" in the terminal, then it you automatically download all the package used in 
//the project according to the dependencies in the "package.josn" file.
//Then it will work perfectly.