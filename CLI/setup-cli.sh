#!/bin/bash
current_directory=$(pwd)
suffix="iecd-backend/CLI"

if [[ $current_directory != *"$suffix" ]]; then
  echo "Setup script should be executed only from its own directory"
  exit 1
fi

echo 'export PATH=$PATH:'$current_directory >> ~/.zprofile
source ~/.zprofile

echo "SUCCESS"