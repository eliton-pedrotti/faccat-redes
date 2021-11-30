const query = require('../database/query');

module.exports = deleteTask = async (id) => {

    let sql = ` 
        DELETE FROM tasks
        WHERE id = ${parseInt(id)};
    `
    return await query(sql);
}