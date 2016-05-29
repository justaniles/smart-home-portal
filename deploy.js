#!/usr/bin/env node
"use strict";

const execSync = require("child_process").execSync;
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
    let dirtyIndex = false;
    try {
        execSync("git diff-index --quiet --cached HEAD");
    } catch (err) {
        dirtyIndex = (err.status === 1);
    }

    if (dirtyIndex) {
        // TODO: automatically stash changes
        console.error("There are uncommitted changes in your index. Please commit or stash them first.");
        process.exit();
    }
    // Push changes in dist folder to gh-pages branch
    console.log("\nTemporarily adding dist to repository");
    execSync("git add -f dist");
    execSync("git commit -m 'Update prod build'");
    console.log(`\nRunning: ${deployCommand}`);
    execSync(deployCommand);
}
