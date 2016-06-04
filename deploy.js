#!/usr/bin/env node
"use strict";

const ghpages = require("gh-pages");
const path = require("path");
const cp = require("child_process");
const yargs = require("yargs");
const argv = yargs.options({
        "b": {
            alias: "build",
            describe: "Build the project using prod build settings",
            boolean: true
        },
        "q": {
            alias: "quiet",
            describe: "Minimal output from commands",
            boolean: true
        }
    })
    .help("h").alias("h", "help")
    .usage("Usage: $0 [-b] [-d]")
    .argv;

// Local variables:
let runBuild = argv.b;
let quiet = argv.q;

if (runBuild) {
    console.log("Building for production...");
    runCommand("npm", ["run", "build:prod"]);
}

console.log("\nDeploying to gh-pages...");
ghpages.publish(path.join(__dirname, "dist"),
    {
        message: "Deployment script commit",
        logger: function(message) {
            console.log(message);
        }
    },
    function(err) {
        if (err) {
            console.error(`Finished with errors:\n${err}`);
            return;
        }
        console.log("Done!");
    }
);

// Helper functions:
function runCommand(command, args) {
    let options = {};
    if (!quiet) {
        options["stdio"] = "inherit";
    }
    let result = cp.spawnSync(command, args, options);
    return result.status;
}
