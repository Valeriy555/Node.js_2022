const express = require('express')
const {fileService} = require("./service");

const app = express();
app.use(express.json())


app.get('/users', async (req, res) => {
    const users = await fileService.reader();
    res.json(users);
});


app.post('/users', async (req, res) => {
    const {name, age} = req.body;
    if (!Number.isInteger(age) || age < 18) { // если число не целое или меньш 18
        return res.status(400).json('Set valid age')
    }

    if (!name || name.length < 3) { // если число не целое или меньш 18
        return res.status(400).json('Set valid age')
    }

    const users = await fileService.reader();

    const newUsers = {...req.body, id: users.length ? users[users.length - 1].id + 1 : 1};
    await fileService.writer([...users, newUsers]);
    res.status(201).json(newUsers);
});


app.get('/users/:userId', async (req, res) => {
    const {userId} = req.params;
    const users = await fileService.reader();

    const user =users.find((user) => user.id === +userId);

    if (!user) {
        return res.status(400).json(`User with id ${userId} not found`);
    }
    res.json(user);
});

app.delete('/users/:userId', async (req, res) => {
    const {userId} = req.params;
    const users = await fileService.reader();

    const index = users.findIndex((user) => user.id === +userId);

    if (!index) {
        return res.status(400).json(`User with id ${userId} not found`);
    }


    await fileService.writer();

    res.json(index);
});


app.listen(3500, () => {
    console.log('Started on port 3500')
});

