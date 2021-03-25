## TODOs
see [Project Board](https://github.com/farawayCC/tomato-timer/projects/1)

## Scripts
1. ```yarn``` will install all modules needed.  
2. ```yarn start``` will start the Electron app and the React app at the same time.  
3. ```yarn build``` will build the React app and package it along the Electron app.

## Want to build on your machine?
1. Fork or Clone or Download the code
2. cd in the folder, containing the package.json (root folder of the app)
3. Run ```yarn```
4. When completed, run ```yarn build```
5. You will find build files in .\tomato-timer\dist

## Project structure
### Electron side
- Main and only file for electron is a electron.js, located in ./public
- electron.js renders index.html in the same solder
- In HTML's file body, you can find <div id="root"></div>. This div is an entry point for a React app
### React side
- ./src/index.js renders ./src/App.js into the <div id="root">, stated above
- ./src/App.js renders component called ClockPage, located in ./src/components/ClockPage.js
- ./src/components/ClockPage.js is a Main UI, that you will see on app startup
