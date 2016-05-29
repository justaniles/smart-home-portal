#!/bin/sh

# A POSIX variable
OPTIND=1         # Reset in case getopts has been used previously in the shell.

# Local variables
buildProdCommand='npm run build:prod'
deployCommand='git subtree push --prefix dist origin gh-pages'
runBuild=false
deploy=false

show_help() {
local formattedString
formattedString=${0##*/}
formattedString=${formattedString%%\.*}
cat << EOF
Usage: ${formattedString} [-b]
    -b  Run npm build:prod before deploying
EOF
}

while getopts ":bdh?" opt; do
    case ${opt} in
        b)
            runBuild=true
            ;;
        d)
            deploy=true
            ;;
        h|?)
            show_help
            exit 1
            ;;
        \?)
            echo "Invalid option: -$OPTARG" >&2
            exit 1
            ;;
    esac
done

shift $((OPTIND-1))

if [ "$runBuild" = true ]; then
    echo 'Running:' ${buildProdCommand}
    eval ${buildProdCommand}
fi

if [ "$runBuild" = true ] && [ "$deploy" = true ]; then
    echo 'Committing changes in dist'
    git add dist
    git commit -m "Update prod build"
fi

if [ "$deploy" = true ]; then
    echo 'Running:' ${deployCommand}
    eval ${deployCommand}
fi

