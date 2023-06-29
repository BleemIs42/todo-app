#!/bin/sh

if ! node -v &>/dev/null
then
  echo "Start install node"
  brew install node
fi

# init react project
yes | npm create vite todo-app -- --template react-ts

# install dependence
cd todo-app
npm i

# run dev to see page
npm run dev
