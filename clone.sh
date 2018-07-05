#!/usr/bin/env bash

echo "➜ cd $1"
cd $1

sleep 1

if [ "$(rm -rf $3)" ]
then
 echo "➜ $3 removed"
fi

sleep 1

echo "➜ git clone $2"
git clone $2