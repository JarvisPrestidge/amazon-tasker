import { sendEmailAlert } from "./email";
import { dropbox } from "../../config/config";
import { dropboxApiFileDownload } from "./network";
// const csvParse = require("csv-parse");
import * as fs from "fs";

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

/**
 * Takes a scan code and returns the corresponding task
 * 
 * @param {string} scanCode 
 * @returns {Promise<string>} 
 */
export const getTaskFromCSV = async (path: string, scanCode: string): Promise<string> => {
    // TODO:     
    fs.readFile(path, (err, data) => {
        if (err) {
            throw new Error(`Failed to write file to disk with error message: ${err.message}`);
        }
        console.log(data);
    });

    return scanCode;
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
