import http from "http";
import createApp from "./createApp.js";

const app = createApp();

const server: http.Server = http.createServer(app);

export { app, server };
