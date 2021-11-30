const query = require('../database/query');

module.exports = createUser = async (user) => {
    let sql = `
    INSERT INTO users (name, email, password)
    VALUES ('${user.name}', '${user.email}', '${user.password}')
    `
    return await query(sql)
}