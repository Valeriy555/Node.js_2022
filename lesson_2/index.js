const express = require('express')
const users = require('./dataBase/users')
const app = express()

app.listen(3500,  () => {
    console.log('Server listen 3500')
});

app.get('/',  (req, res) => {

    // res.status(404).json('NOT FOUND')

    res.json('Hello Valera !!!')
})

app.get('/users', (req,res) => {

    res.json(users);
});



app.get ('/users/:id', (req,res) => {
const userIndex = +req.params.id

    if(userIndex < 0){
        res.status(400).json('Please enter valid ID')
        return;
    }

    const user = users [userIndex];

    if(!user){
        res.status(400).json(`Use with ID ${userIndex} is not found`)
    }

    res.json(user);
});

