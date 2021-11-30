
const http = require("http");
const routes = require("./routes");
const host = 'localhost';
const port = 8000;
const openConnection = require('./database/connection')

// require('./database/runMigrations');

const server = http.createServer(routes);

server.listen(port, host, async () => {
    console.log(`Server is running on http://${host}:${port}`);
    openConnection();
});
