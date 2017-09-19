import { writeFile } from "fs";
import * as request from "request-promise-native";
import config from "../config/config";

const REMOTE_DROPBOX_PATH = "/tasklist.csv";
const LOCAL_CSV_FILE_PATH = "../../tasklist.csv";

/**
 * Downloads a file with the given path from the dropbox api
 * 
 * @param {string} path 
 * @returns {Promise<DropboxTypes.files.FileMetadata>} 
 */
const dropboxApiFileDownload = async (path: string): Promise<string> => {

    // Api request url
    const uri = "https://content.dropboxapi.com/2/files/download";

    // Create the args json object
    const args = JSON.stringify({ path });

    // Header params
    const headers = {
        "Authorization": `Bearer ${config.accessToken}`,
        "Dropbox-API-Arg": args
    };

    const requestOpts = {
        uri,
        method: "POST",
        headers,
        simple: false,
    };

    return await request(requestOpts);
};

/**
 * Takes string content and writes to file on disk
 * 
 * @param {string} content 
 */
const writeFileToDisk = (path: string, content: string): void => {

    return writeFile(path, content, (err) => {
        if (err) {
            // If error object exists throw legible error message
            throw new Error(`Failed to write file to disk with error code: ${err.code}`);
        }
        // Else log success
        console.log('The file has been successfully saved!');
    });
};

/**
 * Entry point
 * 
 * @returns {Promise<void>} 
 */
const main = async (): Promise<void> => {

    // Get file content from api
    const fileContent = await dropboxApiFileDownload(REMOTE_DROPBOX_PATH);

    // Write content to disk
    writeFileToDisk(LOCAL_CSV_FILE_PATH, fileContent)
};

main();

