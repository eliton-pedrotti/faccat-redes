const url = require('url');
const querystring = require('querystring');

const createTask = require('./tasks/createTask');
const getAllTasksByUserId = require('./tasks/getAllTasks');
const deleteTask = require('./tasks/deleteTask');
const editTask = require('./tasks/editTask');

const createUser = require('./users/createUser');
const findUser = require('./users/findUser');

const routes = async (req, res) => {

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "*");
    res.setHeader("Access-Control-Allow-Methods", '*');

    if (req.method === 'OPTIONS') {
        res.writeHead(204);
        res.end();
        return;
    }

    const urlparse = url.parse(req.url, true);

    /**LOGIN */
    if (urlparse.pathname == '/login' && req.method == 'GET') {

        const [, query] = urlparse.search.split('?');
        const { email, password } = querystring.parse(query);

        const jsondata = { email, password }

        let user = await findUser(jsondata)

        if (user.length === 0) {
            const message = { message: 'Usuario inexistente ou senha incorreta!' };

            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(message));
        }

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(user, null, 2));

    }

    /**GET */
    if (urlparse.pathname == '/tasks' && req.method == 'GET') {

        const [, query] = urlparse.search.split('?');
        const { user_id } = querystring.parse(query);

        const tasks = await getAllTasksByUserId(user_id);

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(tasks, null, 2));
    }

    /**POST TASK */
    if (urlparse.pathname == '/create/task' && req.method == 'POST') {

        req.on('data', async (data) => {

            const [, query] = urlparse.search.split('?');
            const { user_id } = querystring.parse(query);
            const jsondata = JSON.parse(data);

            const task = await createTask(jsondata, user_id);

            if (task) {

                const message = { message: 'Task created successfully!' };

                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(message));
            } else {
                const message = { message: 'no task in body request!' };

                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(message));
            }
        });
    }

    /**EDIT TASK */

    if (urlparse.pathname == '/update/task' && req.method == 'PUT') {

        req.on('data', async data => {

            const [, query] = urlparse.search.split('?');
            const { task_id } = querystring.parse(query);

            const jsondata = JSON.parse(data);

            const task = await editTask({ jsondata, task_id });

            if (task) {

                const message = { message: 'Task edited successfully!' };

                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(message));
            } else {
                const message = { message: 'no task in body request!' };

                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(message));
            }
        });
    }

    /**DELETE TASK */
    if (urlparse.pathname == '/delete/task' && req.method == 'DELETE') {

        const [, query] = urlparse.search.split('?');
        const { task_id } = querystring.parse(query);

        const task = await deleteTask(task_id);

        if (task) {

            const message = { message: 'Task deleted successfully!' };

            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(message));
        } else {
            const message = { message: 'no task in body request!' };

            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(message));
        }
    }

    /**POST USER */
    if (urlparse.pathname == '/create/user' && req.method == 'POST') {

        req.on('data', async (data) => {

            const jsondata = JSON.parse(data);

            const user = await createUser(jsondata);

            if (user) {

                const message = { message: 'User created successfully!' };

                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(message));
            } else {
                const message = { message: 'no task in body request!' };

                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(message));
            }
        });
    }
}

module.exports = routes;