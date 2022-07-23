const express = require('express');
const mongoose = require('mongoose');
const expressFileUpload = require('express-fileupload');
const path = require('path');
const http = require('http');
const socketIO = require('socket.io');


require('dotenv').config({ path: path.join(__dirname, 'environments', `${process.env.MODE}.env`)})

const {userRouter, authRouter} = require("./routes");
const {configs} = require("./configs");

mongoose.connect(configs.MONGO_URL);

const app = express();

const server = http.createServer(app);

const io = socketIO(server);

io.on('connection', (socket) => {

});

app.use(express.json());
app.use(express.urlencoded({extended: true}))

app.use(expressFileUpload())
app.use('/auth', authRouter);
app.use('/users', userRouter);

app.use('*', (req, res) => {
    res.status(404).json('Route not found');
});

app.use((err, req, res, next) => {
    console.log(err);
    res
        .status(err.status || 500)
        .json({
            error: err.message || 'Unknown Error',
            code: err.status || 500
        });
});

server.listen(configs.PORT, () => {
    console.log(`Started on port ${configs.PORT}`)
});

