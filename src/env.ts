import * as path from "path";

export const runtime = {
    __basePath: path.join(__dirname, "..", ".."),
    __templates: path.join(__dirname, "..", "..", "templates"),
    __routes: path.join(__dirname, "..", "..", "routes"),
    __static: path.join(__dirname, "..", "..", "static"),
}