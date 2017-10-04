import env from "./env";

// Required for Marko
require("marko/node-require");

// Configure lasso asset bundler
require("lasso").configure({
    plugins: [
        require("lasso-marko")
    ],
    outputDir: env.project.__static,
    urlPrefix: "./",
});
