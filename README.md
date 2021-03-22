### TODOs
- [ ] Optimization
  - [ ] Make content appear faster
  - [ ] Remove 1st sec after timer is started (this second is mostly observed and lasted too long :) )
- [ ] Structure
  - [ ] Screen switcher for Settings and About
- [ ] Settings
  - [ ] (flag) Widget mode (floating on screen without frame + appears only in tray)
  - [ ] (input) Minutes count for pause
  - [ ] (flag) Start counting after mode is changed
- [ ] UI
  - [ ] Progress display (maybe round or a standart bar)
  - [ ] Count today's tomatos
- [ ] Tests
  - [ ] Unit tests
  - [ ] React components tests

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
