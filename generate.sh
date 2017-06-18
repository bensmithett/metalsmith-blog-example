#!/usr/bin/env bash

set -o errexit

gulp clean
gulp metalsmith
gulp stylesheets
gulp images
gulp rev

echo ""
echo "Static site generated into the 'deploy' directory."
