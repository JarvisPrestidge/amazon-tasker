import { updateCSV, getTaskFromCSV } from "./utils/csv";
import { Context } from "koa";
import * as Body from "koa-body";
import * as Router from "koa-router";
import "./lasso";

// Create router instance
const router = new Router()

// Create body parser instance
const body = Body()

// Require page templates
const index = require("./routes/index");

export default router
    .get("/", dropboxChallengeHandler)
    .post("/", body, dropboxWebHookHandler)
    .get("/tasker", indexHandler)
    .post("/badgeid", body, scanHandler);

async function dropboxChallengeHandler(ctx: Context) {
    // Echo back the dropbox challenge
    ctx.type = "text/html";
    ctx.body = ctx.query.challenge;
    console.log("Receieved dropbox challenge / repsonse")
};

async function dropboxWebHookHandler() {
    // TODO: collect meta data from post body and send to updateCSV()
    await updateCSV();
    console.log("Updating csv...");
};

async function indexHandler(ctx: Context) {
    console.log("Serving main page to client...");
    ctx.type = "text/html";
    ctx.body = await index.stream();
};

async function scanHandler(ctx: Context) {
    const scanCode: string = ctx.request.body;
    console.log("Scan code: ", scanCode);
    ctx.type = "text/html";
    ctx.body = await getTaskFromCSV(scanCode)
};
