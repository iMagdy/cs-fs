#!/usr/bin/env bash

echo ""
echo "-------------------------------------------------------------"
echo " Building and deploying WarrantX STAGING: [THIS MAY TAKE A WHILE]"
echo "-------------------------------------------------------------"
echo ""
ssh -T velexo<<'ENDSSH'
  rm -rf ~/warrantx/dist/staging/app.tar.gz
  rm -rf ~/warrantx/dist/staging/app

  source ~/.nvm/nvm.sh

  nvm use 4.8.2

  cd ~/warrantx/staging

  git pull origin master
  $(which npm) install
  meteor npm install
  echo 'Building binaries ...'
  meteor build ~/warrantx/dist/staging

  cd ~/warrantx/dist/staging
  tar xvf staging.tar.gz
  mv bundle/ app/

  cd app/programs/server/
  $(which npm) install
  cd ~/warrantx

  pm2 restart apps.yml --only warrantx-staging

ENDSSH
echo "OK"


echo ""
echo "-------------------------------------------------------------"
echo "All done!"
echo "-------------------------------------------------------------"
echo ""
