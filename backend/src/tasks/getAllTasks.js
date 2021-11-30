const query = require('../database/query');

module.exports = getAllTasksByUserId = async (user_id) => {
    let sql = `
        SELECT * FROM tasks WHERE user_id = ${user_id};
    `
    return await query(sql);
}