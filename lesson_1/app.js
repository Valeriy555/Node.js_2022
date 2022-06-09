const fs = require('fs/promises');
const path = require('path');

const sortFolder = async (read, gender, write) => {
    try {
        const files = await fs.readdir(path.join(__dirname, read));

        for (const file of files) {
            const redFolderPath = path.join(__dirname, read, file);
            const data = await fs.readFile(redFolderPath);
            const user = JSON.parse(data.toString());

            if (user.gender === gender) {
                await fs.rename(redFolderPath, path.join(__dirname, write, file));
            }
        }
    }catch (e) {
        console.error(e);
    }
}

sortFolder('girls', 'male', 'boys');
sortFolder('boys', 'female', 'girls');