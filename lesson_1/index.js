const fs = require ('fs');
const path = require('path')

const sortBoysFolder = () => {

fs.readdir('./boys',(err,files) => {
    if (err) return console.log(err);

    files.forEach((file) => {
        fs.readFile(path.join(__dirname, 'boys', file),(err, data) => {})
        if (err) return console.log(err);
    })
})

}

sortBoysFolder();