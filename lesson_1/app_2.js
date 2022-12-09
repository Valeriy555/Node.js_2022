const fs = require('fs/promises');
const path = require('path');

const foo = async () => {
    const folderPath = path.join(__dirname, 'boys');

    const files = await fs.readdir(folderPath);

    for (const file of files) {
        const filePath = path.join(folderPath, file);
        const data = await fs.readFile(filePath);
        const user = JSON.parse(data);

        if (user.gender === 'female') {
            await fs.rename(filePath, path.join(__dirname, 'girls', file))
        }
    }
}

const foo1 = async () => {
    const folderPath = path.join(__dirname, 'girls');
    console.log(__dirname)
    const files = await fs.readdir(folderPath);

    for (const file of files) {
        const filePath = path.join(folderPath, file);
        const data = await fs.readFile(filePath);
        const user = JSON.parse(data);

        if (user.gender === 'male') {
            await fs.rename(filePath, path.join(__dirname, 'boys', file))
        }
    }
}

foo()
foo1()