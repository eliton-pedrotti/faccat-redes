
const path = require('path');
const fs = require('fs');
const openConnection = require('../database/connection');

const fileDatabaseDir = path.join(__dirname, 'migrations');

(async () => {
fs.readdir(fileDatabaseDir, (err, files) => {
    if(err){
        console.error(err);
    }
    files.forEach((file) => {
        fs.readFile(path.join(fileDatabaseDir, file), async (err, content) => {
            if(err){
                console.error(err)
            }

            const runMigrationQuery = content.toString();

            openConnection().exec(runMigrationQuery);

        });
    })
})
})();

