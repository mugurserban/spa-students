import http from "http";
import app from "./app";

//Use system configuration for port or use 8080 by default.
const port = process.env.port || 8080;

//Create server with exported express app
const server = http.createServer(app);
server.listen(port);