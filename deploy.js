#!/usr/bin/env node
"use strict";

const cp = require("child_process");
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
let runDeploy = argv.d;
let quiet = argv.q;

if (!(runBuild || runDeploy)) {
    yargs.showHelp();
    process.exit();
}

if (runBuild) {
    console.log("Building for production...");
    runCommand("npm", ["run", "build:prod"]);
}

if (runDeploy) {
    // Fail if there are uncommitted changes
    let exitCode = runCommand("git", ["diff-index", "--quiet", "--cached", "HEAD"]);
    if (exitCode !== 0) {
        // TODO: automatically stash changes
        console.error("Deployment failure: There are uncommitted changes in your index. Please commit or stash them first.");
        process.exit();
    }
    // Fail if unpushed commits
    exitCode = runCommand("git", ["diff-tree", "@{u}", "HEAD", "--quiet"]);
    if (exitCode !== 0) {
        console.error("Deployment failure: There are unpushed changes in your local repo. Please push them first.");
        process.exit();
    }

    console.log("Adding dist to repository...");
    runCommand("git", ["add", "dist"]);
    runCommand("git", ["commit", "-m", "'Update prod build'"]);
    console.log("Pushing to gh-pages...");
    runCommand("git", ["subtree", "push", "--prefix", "dist", "origin", "gh-pages"]);
}

console.log("Done!");


// Helper functions:
function runCommand(command, args) {
    let options = {};
    if (!quiet) {
        options["stdio"] = "inherit";
    }
    let result = cp.spawnSync(command, args, options);
    return result.status;
}
