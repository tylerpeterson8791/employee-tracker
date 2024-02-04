const mainMenu = require('../mainMenu.js');
const db = require("../../config/connect.js");

function viewDepartments(mainMenuFunction) {
    // SQL query to select name column from department table displaying name as DEPARTMENT
    const query = "SELECT id AS 'Dept ID', name AS DEPARTMENT FROM company_db.department";

    // Execute the query
    db.query(query, (error, results) => {
        if (error) {
            console.error(error);
            return;
        }

        // Log the results to the console
        console.log("List of Departments:");
      
        //this works but shows index which is irrellevant.  Cant figure out how to hide.  Moving on and revisiting later
        console.table(results);

        // Call the mainMenuFunction
        mainMenuFunction();
    })};

module.exports = viewDepartments