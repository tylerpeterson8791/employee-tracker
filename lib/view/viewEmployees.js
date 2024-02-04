const mainMenu = require('../mainMenu.js');
const db = require("../../config/connect.js");
// const query = require("../../db/query_viewEmployees.sql");  Thinking of requiring it in but don't know how.  Doing some research.

function viewEmployees(mainMenuFunction) {

    const query = "SELECT employee.id AS 'Employee ID', employee.first_name AS 'First Name', employee.last_name AS 'Last Name', role.title AS Title, role.salary AS Salary, department.name AS Department, CASE WHEN employee.manager_id IS NULL THEN '**MANAGER**' ELSE CONCAT(manager.first_name, ' ', manager.last_name) END AS Supervisor FROM  employee JOIN  role ON employee.role_id = role.id JOIN  department ON role.department_id = department.id LEFT JOIN employee manager ON employee.manager_id = manager.id;"
    
    db.query(query, (error, results) => {
        if (error) {
            console.error(error);
            return;
        }

        // Log the results to the console
        console.log("List of Employees:");
      
        //this works but shows index which is irrellevant.  Cant figure out how to hide.  Moving on and revisiting later
        console.table(results);

        // Call the mainMenuFunction
        mainMenuFunction();
    })};


module.exports = viewEmployees

////clean up display.  do some AS on them.  Add in boss column.  Maybe seperate out this query, it's getting long.