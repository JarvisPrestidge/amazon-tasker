import { sendEmailAlert } from "./email";
import { dropbox } from "../../config/config";
import { dropboxApiFileDownload } from "./network";
const csvParse = require("csv-parse/lib/sync");
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
 * Data type representing a single row of csv
 * 
 * @interface IRow
 */
interface IRow {
    badge_id: string;
    task: string;
}

/**
 * Takes a scan code and returns the corresponding task
 * 
 * @param {string} scanCode 
 * @returns {Promise<string>} 
 */
export const getTaskFromCSV = async (path: string, scanCode: string): Promise<string> => {
    return new Promise<string>((resolve, reject) => {
        fs.readFile(path, (err, data) => {
            if (err) {
                reject(`Failed to write file to disk with error message: ${err.message}`);
            }
            const rows: IRow[] = csvParse(data, {
                delimiter: ",",
                columns: ["badge_id", "task"],
                from: 2,
            });
            const row = rows.find((row) => row.badge_id === scanCode);
            if (!row) {
                return resolve("User not in system");
            }
            console.log(row.task);
            resolve(row.task);
        });
    })
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
