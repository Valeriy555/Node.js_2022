 const express = require('express');
 const mongoose = require('mongoose');

 mongoose.connect('mongodb://localhost:27017/dec')

 const {userRouter} = require("./routes");

const app = express();

app.use(express.json())

app.use('/users', userRouter);

app.use('*',(req,res) =>{
    res.status(404).json('Page not found');
});


app.listen(3500, () => {
    console.log('Started on port 3500')
});

