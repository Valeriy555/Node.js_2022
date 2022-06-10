const express = require('express');
const app = express();

app.use(express.json())
app.use(express.urlencoded({extended:true}))


app.listen(3500,  () => {
    console.log('Server is running on 3500')
})


app.get('/',(req,res) =>{
res.end('Node is great!')
});

app.get('/hello', (rec,res) => {
    res.end('Privet, Valera!!!')
});

app.get('/hello/:text', (req,res) =>{
    let params = req.params;
    console.log(params)
    res.end('Hello' + params.text)
})

app.post('/hello',  (req,res) => {

    console.log(req.body);

    res.end('Привет Валера')
})


