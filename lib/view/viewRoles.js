const mainMenu = require('../mainMenu.js');
const db = require("../../config/connect.js");

function viewRoles(mainMenuFunction) {
    const query = "SELECT role.title AS ROLE, role.salary AS SALARY, department.name AS DEPARTMENT FROM company_db.role role JOIN company_db.department department ON role.department_id = department.id";

    db.query(query, (error, results) => {
        if (error) {
            console.error(error);
            return;
        }
        console.log("List of Roles:");
      
        //this works but shows index which is irrellevant.  Cant figure out how to hide.  Moving on and revisiting later
        console.table(results);

        // Call the mainMenuFunction
        mainMenuFunction();
    })};

module.exports = viewRoles