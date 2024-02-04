const mainMenu = require('../mainMenu.js');
const db = require("../../config/connect.js");

function viewEmployees(mainMenuFunction) {

    const query = "SELECT employee.id AS employee_id, employee.first_name, employee.last_name, role.title AS role_title, role.salary, department.name AS department_name FROM  employee JOIN  role ON employee.role_id = role.id JOIN  department ON role.department_id = department.id;"
    
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













/*Display is grid type with:
id  first_name  last_name  title  department  salary  manager

THEN it should throw back to main menu*/

// function viewEmployee() {
//     console.log('Here are all current employees:')
//     const query = 'SELECT * FROM employee;';
  
//     db.query(query, (err, results) => {
//       if (err) {
//         throw err;
//       }
//       console.log(formatQuery(results));
//     });
// }
