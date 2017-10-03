import { dropbox } from "../config/config";
import * as Request from "request-promise-native";

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
