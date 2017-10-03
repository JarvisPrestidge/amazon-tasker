import config from "../config/config";
import * as Request from "request-promise-native";

export type Shift = "DAY" | "NIGHT";

/**
 * Download a file with the given path from the dropbox api
 * 
 * @param {string} remotePath 
 */
export const dropboxApiFileDownload = async (shift: Shift): Promise<string> => {

    const path = shift === "DAY"
        ? config.dropbox.REMOTE_FILE_PATH_DAY
        : config.dropbox.REMOTE_FILE_PATH_DAY;

    const args = JSON.stringify({ path });

    const headers = {
        "Authorization": `Bearer ${config.dropbox.ACCESS_TOKEN}`,
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
