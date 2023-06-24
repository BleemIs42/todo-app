#!/bin/sh

# install node
brew install node

# init react project 
yes | npm create vite todo-app -- --template react-ts

# install dependence
cd todo-app
npm i

# run dev to see page
npm run dev