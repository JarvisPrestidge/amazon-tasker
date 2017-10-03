const csvParse = require("csv-parse/lib/sync");
import { dropboxApiFileDownload, Shift } from "./network";
import { sendEmailAlert } from "./email";
import env from "./../env";
import * as moment from "moment";
import * as fs from "fs";

/**
 * Update local copy of csv file with remote
 */
export const updateCSV = async (): Promise<void> => {
    const shift = getShift();
    const fileContent = await dropboxApiFileDownload(shift);
    if (!fileContent) {
        sendEmailAlert("alert");
    }
    writeFileToDisk(env.__csvDay, fileContent)
};

/**
 * If we're currently between the hours of 6am - 6pm then return day else night
 * 
 * @returns {Shift} 
 */
const getShift = (): Shift => {
    return moment().isBetween(moment({hour: 6}), moment({hour: 18}))
        ? "DAY"
        : "NIGHT";
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
