import { writeFile } from "fs";
import * as Koa from "koa";
import * as Router from "koa-router";
import * as Request from "request-promise-native";
import Config from "../config/config";

const REMOTE_DROPBOX_PATH = "/tasklist.csv";
const LOCAL_CSV_FILE_PATH = "./tasklist.csv";

/**
 * Downloads a file with the given path from the dropbox api
 * 
 * @param {string} path 
 * @returns {Promise<string>} 
 */
const dropboxApiFileDownload = async (path: string): Promise<string> => {

    // Api request url
    const uri = "https://content.dropboxapi.com/2/files/download";

    // Create args json object
    const args = JSON.stringify({ path });

    // Header params
    const headers = {
        "Authorization": `Bearer ${Config.accessToken}`,
        "Dropbox-API-Arg": args
    };

    const requestOpts = {
        uri,
        method: "POST",
        headers,
        simple: false,
    };

    return await Request(requestOpts);
};

/**
 * Takes string content and writes to file on disk
 * 
 * @param {string} path 
 * @param {string} content 
 * @returns {void} 
 */
const writeFileToDisk = (path: string, content: string): void => {

    return writeFile(path, content, (err) => {
        console.log(path);
        console.log(content);
        if (err) {
            // If error object exists throw legible error message
            throw new Error(`Failed to write file to disk with error code: ${err.code}`);
        }
        // Else log success
        console.log("The file has been successfully saved!");
    });
};

/**
 * Update local copy of csv file with remote
 * 
 * @returns {Promise<void>} 
 */
const updateCSV = async (): Promise<void> => {
    // Get file content from api
    const fileContent = await dropboxApiFileDownload(REMOTE_DROPBOX_PATH);
    // Write content to disk
    writeFileToDisk(LOCAL_CSV_FILE_PATH, fileContent)
};

/**
 * Setup server to listen for web-hook notifications
 */
const initServer = () => {

    // Create Koa instance
    const app = new Koa();
    const router = new Router()

    // Route for dropbox web-hook challenge
    router.get("/", async (ctx) => ctx.body = ctx.query.challenge);
    // Route for dropbox file update
    router.post("/", async (ctx) => await updateCSV());

    app.use(router.routes());
    app.listen(4000, () => console.log("\nServer started, listening on port 4000..."));
};

initServer();