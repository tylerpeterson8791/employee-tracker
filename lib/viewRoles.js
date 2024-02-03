const mainMenu = require('./mainMenu.js');

function viewRoles() {
    console.log("HERES A LIST OF ROLES");
    // mainMenu(); This creates circular dependency.  Figure out a different way.
}

module.exports = viewRoles