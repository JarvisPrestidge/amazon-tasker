import { dropbox } from "../config/config";
import { sendEmailAlert } from "./email";
import * as fs from "fs";
import * as Koa from "koa";
import * as Router from "koa-router";
import * as Request from "request-promise-native";

/**
 * Download a file with the given path from the dropbox api
 * 
 * @param {string} remotePath 
 */
const dropboxApiFileDownload = async (remotePath: string): Promise<string> => {

    const args = JSON.stringify({ remotePath });

    const headers = {
        "Authorization": `Bearer ${dropbox.ACCESS_TOKEN}`,
        "Dropbox-API-Arg": args
    };

    const requestOpts: Request.Options = {
        uri: "https://content.dropboxapi.com/2/files/download",
        method: "POST",
        headers,
        simple: false
    };

    // Fire request
    return await Request(requestOpts);
};

/**
 * Takes string content and writes to file on disk
 * 
 * @param {string} path 
 * @param {string} content 
 */
const writeFileToDisk = (path: string, content: string): void => {
    // Attempt to write content to file and handle results
    return fs.writeFile(path, content, (err) => {
        if (err) {
            throw new Error(`Failed to write file to disk with error message: ${err.message}`);
        }
        console.log("The file has been successfully saved!");
    });
};

/**
 * Update local copy of csv file with remote
 */
const updateCSV = async (): Promise<void> => {
    const fileContent = await dropboxApiFileDownload(dropbox.REMOTE_DROPBOX_FILE_PATH);
    if (fileContent) {
        sendEmailAlert();
    }
    writeFileToDisk(dropbox.LOCAL_SAVE_FILE_PATH, fileContent)
};

// Setup koa webserver
const app = new Koa();
const router = new Router()

// Configure routes
router.get("/", async (ctx) => ctx.body = ctx.query.challenge);
router.post("/", async (ctx) => await updateCSV());

app.use(router.routes());
app.listen(4000, () => console.log("\nServer started, listening on port 4000..."));