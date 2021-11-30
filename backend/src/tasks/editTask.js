const query = require('../database/query');

module.exports = editTask = async (task) => {

    const { description } = task.jsondata;

    let sql = `
        UPDATE tasks SET description = '${description}'
        WHERE id = ${parseInt(task.task_id)}
    `

    return await query(sql);
}