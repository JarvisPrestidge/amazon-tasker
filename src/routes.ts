import { updateCSV } from "./utils";
import { runtime } from "./env";
import { Context } from "koa";
import * as Body from "koa-body";
import * as Router from "koa-router";
import "./lasso";

// Create router instance
const router = new Router()

// Create body parser instance
const body = Body()

// Require page templates
const index = require(`${runtime.__routes}/index`);
// const index = require("../../routes/index");

// Back-end
router
    .get("/", dropboxChallengeHandler)
    .post("/", body, dropboxWebHookHandler);


// Front-end
router    
    .get("/tasker", indexHandler)
    .post("/badgeid", body, scanHandler);

export default router;

async function dropboxChallengeHandler(ctx: Context) {
    // Echo back the dropbox challenge
    ctx.body = ctx.query.challenge;
    console.log("Receieved dropbox challenge / repsonse")
};

async function dropboxWebHookHandler() {
    await updateCSV();
    console.log("Updating csv...");
};

async function indexHandler(ctx: Context) {
    console.log("Serving main page to client...");
    ctx.type = "text/html";
    ctx.body = await index.stream();
};

async function scanHandler(ctx: Context) {
    const scanCode = ctx.request.body;
    console.log("Scan code: ", scanCode);
};
