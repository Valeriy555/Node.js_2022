const express = require('express');
const mongoose = require('mongoose');

const {userRouter} = require("./routes");
const {configs} = require("./configs");




const app = express();
app.use(express.json())

app.use('/users', userRouter);

app.use('*', (req, res) => {
    res.status(404).json('Page not found');
});

app.use((err, req, res, next) => {
    res
        .status(err.status || 500)
        .json({
            error: err.message || 'Unknown Error',
            code: err.status || 500
        });
});

app.listen(configs.PORT, async () => {
    console.log(`Started on port ${configs.PORT}`)
    await mongoose.connect(configs.MONGO_URL)
});

