import config from "../config/config";
import * as fs from "fs";
import * as Koa from "koa";
import * as Router from "koa-router";
import * as Request from "request-promise-native";

const REMOTE_DROPBOX_PATH = "/tasklist.csv";
const LOCAL_CSV_FILE_PATH = "./tasklist.csv";

/**
 * Downloads a file with the given path from the dropbox api
 * 
 * @param {string} remotePath 
 * @returns {Promise<string>} 
 */
const dropboxApiFileDownload = async (remotePath: string): Promise<string> => {

    const uri = "https://content.dropboxapi.com/2/files/download";

    const args = JSON.stringify({ remotePath });

    const headers = {
        "Authorization": `Bearer ${config.accessToken}`,
        "Dropbox-API-Arg": args
    };

    const requestOpts: Request.Options = {
        uri,
        method: "POST",
        headers
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
    return fs.writeFile(path, content, (err) => {
        if (err) {
            throw new Error(`Failed to write file to disk with error message: ${err.message}`);
        }
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

// Create Koa instance
const app = new Koa();
const router = new Router()

// "GET" route for dropbox web-hook setup
router.get("/", async (ctx) => ctx.body = ctx.query.challenge);
// "POST" route for dropbox web-hook notifications
router.post("/", async (ctx) => await updateCSV());

app.use(router.routes());
app.listen(4000, () => console.log("\nServer started, listening on port 4000..."));