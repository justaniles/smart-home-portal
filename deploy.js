#!/usr/bin/env node
"use strict";

const spawnSync = require("child_process").spawnSync;
const yargs = require("yargs");
const argv = yargs.options({
        "b": {
            alias: "build",
            describe: "Build the project using prod build settings",
            boolean: true
        },
        "d": {
            alias: "deploy",
            describe: "Deploy the project to gh-pages",
            boolean: true
        }
    })
    .help("h").alias("h", "help")
    .usage("Usage: $0 [-b] [-d]")
    .argv;

// Local variables:
let buildProdCommand = "npm run build:prod";
let deployCommand = "git subtree push --prefix dist origin gh-pages";

let runBuild = argv.b;
let runDeploy = argv.d;

if (!(runBuild || runDeploy)) {
    yargs.showHelp();
    process.exit();
}

if (runBuild) {
    console.log(`\nRunning: ${buildProdCommand}`);
}

if (runDeploy) {
    // Fail if there are uncommitted changes
    let checkIndex = spawnSync("git diff-index --quiet --cached HEAD");
    if (checkIndex.status !== 0) {
        // TODO: automatically stash changes
        console.error("There are uncommitted changes in your index. Please commit or stash them first.");
        process.exit();
    }
    // Push changes in dist folder to gh-pages branch
    console.log("\nTemporarily adding dist to repository");
    spawnSync("git add -f dist");
    spawnSync("git commit -m 'Update prod build'");
    console.log(`\nRunning: ${deployCommand}`);
    spawnSync(deployCommand);
}
