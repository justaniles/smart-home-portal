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
    let checkIndex = spawnSync("git diff-index --quiet --cached HEAD -G [^dist]");
    if (checkIndex.status !== 0) {
        console.error("There are uncommitted changes in your index (outside the dist folder). Please commit or stash them first!");
        process.exit();
    }
    // Check if dist folder is dirty
    let result = spawnSync("git diff-files --quiet dist");
    if (result.status !== 0) {
        console.log("\nDirty working tree for dist/ directory. Committing changes...");
        spawnSync("git add dist");
        syawnSync("git commit -m 'Update prod build'");
    }
    console.log(`\nRunning: ${deployCommand}`);
}
