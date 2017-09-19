import Dropbox = require("dropbox");
import fs = require("fs");
import config from "../config/config";


const dbSDK = new Dropbox({ accessToken: config.accessToken });

/**
 * Downloads a file with the given path
 * 
 * @param {string} path 
 * @returns {Promise<DropboxTypes.files.FileMetadata>} 
 */
const downloadFile = async (path: string): Promise<DropboxTypes.files.FileMetadata> => {
    return await dbSDK.filesDownload({ path });
};

/**
 * Takes the content from dropbox api call and writes to disk
 * 
 * @param {string} content 
 */
const writeFileToDisk = (content: string): void => {
    return fs.writeFile("tasklist.csv", content, (err) => { throw err.message });  
};

const file = downloadFile("/tasklist.csv");


