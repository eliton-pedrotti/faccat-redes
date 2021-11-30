const query = require('../database/query')

module.exports = createTask = async (task, user) =>{

    let sql = `
    INSERT INTO tasks (description, user_id)
    VALUES ('${task.description}', ${parseInt(user)})
    `
    return await query(sql)
}

