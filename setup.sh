#!/usr/bin/env bash

# Exit if any subcommand fails
set -e

echo 'BUNDLING'
bundle exec bundle install
echo 'BUNDLE COMPLETE'

echo 'Installing Yarn Packages'

if ! command -v node > /dev/null; then
  printf "You must install node on your system before setup can continue"
  exit -1
fi

yarn install
echo 'Yarn installed'

echo 'Setting Up Database'
bundle exec rake db:create db:migrate


