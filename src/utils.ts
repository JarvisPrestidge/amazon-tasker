import { dropbox } from "../config/config";
import { sendEmailAlert } from "./email";
import * as fs from "fs";
import * as Request from "request-promise-native";

/**
 * Update local copy of csv file with remote
 */
export const updateCSV = async (): Promise<void> => {
    const fileContent = await dropboxApiFileDownload(dropbox.REMOTE_DROPBOX_FILE_PATH);
    if (fileContent) {
        sendEmailAlert("alert");
    }
    writeFileToDisk(dropbox.LOCAL_SAVE_FILE_PATH, fileContent)
};

export const getTaskFromCSV = async (scanCode: string): Promise<string> => {
    // TODO:     
    return scanCode;
};

/**
 * Download a file with the given path from the dropbox api
 * 
 * @param {string} remotePath 
 */
export const dropboxApiFileDownload = async (path: string): Promise<string> => {

    const args = JSON.stringify({ path });

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
export const writeFileToDisk = (path: string, content: string): void => {
    // Attempt to write content to file and handle results
    return fs.writeFile(path, content, (err) => {
        if (err) {
            throw new Error(`Failed to write file to disk with error message: ${err.message}`);
        }
        console.log("The file has been successfully saved!");
    });
};

