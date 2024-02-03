const mainMenu = require('../mainMenu.js');
const db = require("../../config/connect.js");

function viewDepartments(mainMenuFunction) {
    // SQL query to select all columns from the department table.  Maybe just do dept name?  Test first
    const query = "SELECT * FROM company_db.department";

    // Execute the query
    db.query(query, (error, results) => {
        if (error) {
            console.error("Error executing the query:", error);
            return;
        }

        // Log the results to the console
        console.log("List of Departments:");
        console.table(results);

        // Call the mainMenuFunction
        mainMenuFunction();
    });
}

module.exports = viewDepartments