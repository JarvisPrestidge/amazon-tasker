import api from "./routes";
import env from "./env";
import * as opn from "opn";
import * as Koa from "koa";
import * as serve from "koa-static";

// Launches chrome
opn('http://localhost:4000/tasker', {app: "google-chrome"});

// Setup koa webserver
const app = new Koa();

// Serve the contents of the static folder
app.use(serve(env.project.__static));
// TODO: try to use lasso server middleware
// app.use(require("lasso/middleware/koa/serveStatic"));

// Get routes and serve
app.use(api.routes());
app.listen(4000, () => console.log("\nServer started, listening on port 4000..."));