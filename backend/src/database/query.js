const openConnection = require('./connection');

module.exports = dbQuery = (query, params) => {
    let db = openConnection();
    return new Promise((resolve, reject) => {
        db.all(query, params, (err, rows) => {
            if (err)
                reject(err);
            else
                resolve(rows);
        })
    })
    .finally(() => {
        db.close();
    })
}