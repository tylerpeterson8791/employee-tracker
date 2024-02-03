const mainMenu = require('../mainMenu.js');

function addEmployee(mainMenuFunction) {
    console.log("ADDING AN EMPLOYEE");
    mainMenuFunction();
}

module.exports = addEmployee
