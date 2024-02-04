const mainMenu = require('../mainMenu.js');
const inquirer = require('inquirer');
const db = require("../../config/connect.js");

function viewEmployeesByManager(mainMenuFunction) {
    // Get the list of managers
    const managersQuery = "SELECT id, CONCAT(first_name, ' ', last_name) AS manager_name FROM company_db.employee WHERE manager_id IS NULL";
    db.query(managersQuery, (error, managerResults) => {
        if (error) {
            console.error("Error getting managers:", error);
            return;
        }
        //prep data for inquirer
        const managerChoices = managerResults.map(manager => ({ value: manager.id, name: manager.manager_name }));

        // Prompt the user to select a manager
        inquirer
            .prompt([
                {
                    type: 'list',
                    name: 'managerId',
                    message: 'Please select a manager:',
                    choices: managerChoices,
                },
            ])
            .then(answers => {
                const { managerId } = answers;

                // Get detailed information about employees managed by the selected manager
                const employeesQuery = `SELECT employee.id AS 'Employee ID', employee.first_name AS 'First Name', employee.last_name AS 'Last Name', role.title AS 'Title', role.salary AS 'Salary' FROM company_db.employee JOIN company_db.role ON employee.role_id = role.id WHERE employee.manager_id = ?;
                `;

                db.query(employeesQuery, [managerId], (error, employeeResults) => {
                    if (error) {
                        console.error(error);
                        return;
                    }

                    console.log(`Employees managed by the selected manager:`);

                    // Display the detailed table of employees
                    console.table(employeeResults);

                    // Call the mainMenuFunction
                    mainMenuFunction();
                });
            });
    });
}

module.exports = viewEmployeesByManager