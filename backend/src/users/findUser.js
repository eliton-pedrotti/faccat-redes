const query = require('../database/query');

module.exports = findUser = async (user) => {

    let sql = `
        SELECT * FROM users WHERE email = '${user.email}' AND password = '${user.password}'
    `
    return await query(sql)
}