const mainMenu = require('../mainMenu.js');

function viewDepartments(mainMenuFunction) {
    console.log("HERES A LIST OF DEPARTMENTS");
    mainMenuFunction();
}

module.exports = viewDepartments