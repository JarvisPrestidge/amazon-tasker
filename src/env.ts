import * as path from "path";

export default {
    // Project relative paths
    __basePath: path.join(__dirname, ".."),
    __templates: path.join(__dirname, "templates"),
    __routes: path.join(__dirname, "routes"),
    __static: path.join(__dirname, "static"),

    // CSV paths
    __csvDay: path.join("/", "var", "lib", "tasker", "day.csv"),
    __csvNight: path.join("/", "var", "lib", "tasker", "night.csv")
}