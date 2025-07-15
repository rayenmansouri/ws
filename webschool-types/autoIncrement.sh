#!/bin/bash

# Check if package.json exists
if [ ! -f "package.json" ]; then
    echo "package.json not found in the current directory."
    exit 1
fi

# Extract current version from package.json
current_version=$(grep -o '"version": *"[^"]*"' package.json | grep -o '[0-9.]*')

# Check if current_version is empty
if [ -z "$current_version" ]; then
    echo "Could not extract current version from package.json."
    exit 1
fi

# Increment the last part of the version (assuming semantic versioning)
new_version=$(awk -F. -v OFS=. '{$NF = $NF + 1;} 1' <<< "$current_version")

# Update the version in package.json
sed -i "s/\"version\": \".*\"/\"version\": \"$new_version\"/" package.json

echo "Version updated from $current_version to $new_version in package.json."

git add .

git commit -m "updated version to $new_version"
