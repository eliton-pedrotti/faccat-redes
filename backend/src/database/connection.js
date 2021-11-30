const sqlite3 = require('sqlite3');
const { open } = require('sqlite');
const path = require('path');

const fileDatabaseDir = path.join(__dirname, '..', 'database', 'database.sqlite');

console.log(fileDatabaseDir)

module.exports = openConnection = () => {
    let db = new sqlite3.Database(fileDatabaseDir);
    return db;
}
