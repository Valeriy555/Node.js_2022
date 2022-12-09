const fs = require('fs/promises');
const path = require('path');

const sortFolder = async (readFolder, gender, write) => {
    try {
        const folderPath = path.join(path.join(__dirname, readFolder))

        const files = await fs.readdir(folderPath);

        for (const file of files) {
            const redFolderPath = path.join(folderPath, file);
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