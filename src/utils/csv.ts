const csvParse = require("csv-parse/lib/sync");
import { dropboxApiFileDownload } from "./network";
import { sendEmailAlert } from "./email";
import { getShift } from "./time";
import config from "../config/config";
import env from "./../env";
import * as fs from "fs";

/**
 * Update local copy of csv file with remote
 */
export const updateCSV = async (): Promise<void> => {

    const shift = getShift();

    // TODO: get meta-data from csv web-hook post to download 
    // the correct file

    const path = shift === "DAY"
        ? config.dropbox.REMOTE_FILE_PATH_DAY
        : config.dropbox.REMOTE_FILE_PATH_DAY;

    const fileContent = await dropboxApiFileDownload(path);
    if (!fileContent) {
        sendEmailAlert("alert");
    }
    writeFileToDisk(env.data.__csvDay, fileContent)
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
export const getTaskFromCSV = async (scanCode: string): Promise<string> => {

    // Get current shift
    const shift = getShift();

    // Point to relevant file path
    const path = shift === "DAY"
        ? env.data.__csvDay
        : env.data.__csvNight;

    return new Promise<string>((resolve, reject) => {
        fs.readFile(path, (err, data) => {
            if (err) {
                reject(`Failed to write file to disk with error message: ${err.message}`);
            }
            const rows: IRow[] = csvParse(data, {
                delimiter: ",",
                columns: ["badge_id", "task"],
                skip_lines_with_empty_values: true,
                from: 2
            });
            const row = rows.find((row) => row.badge_id === scanCode);
            console.log(row);
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
