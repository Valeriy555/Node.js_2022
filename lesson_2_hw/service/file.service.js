const fs = require("fs/promises");
const path = require("path");

const dbPath = path.join(process.cwd(), 'dataBase', 'users.json')

module.exports = {
    reader: async () => {
        try {
            const data = await fs.readFile(dbPath);
            return data.toString()
                ? JSON.parse(data.toString())
                : [];
        } catch (e) {
            console.error(e)
        }
    },

    writer: async (users) => {
        try {
            await fs.writeFile(dbPath, JSON.stringify(users));
        } catch (e) {
            console.error(e)
        }
    }
}