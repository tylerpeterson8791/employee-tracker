const mainMenu = require('../mainMenu.js');
const inquirer = require('inquirer');
const db = require("../../config/connect.js");

function updateManager(mainMenuFunction) {

    //Get list of all managers (where manager_id is NULL).  Combine first and last name
    const managersQuery = "SELECT id, CONCAT(first_name, ' ', last_name) AS manager_name FROM company_db.employee WHERE manager_id IS NULL";
    db.query(managersQuery, (error, managerResults) => {
        if (error) {
            console.error("Error getting managers:", error);
            return;
        }
        //prep data for inquirer
        const managerChoices = managerResults.map(manager => ({ value: manager.id, name: manager.manager_name }));





        // Get the list of all employees.  Combine first and last name.
        const employeesQuery = "SELECT id, CONCAT(first_name, ' ', last_name) AS employee_name FROM company_db.employee";
        db.query(employeesQuery, (error, employeeResults) => {
            if (error) {
                console.error(error);
                return;
            }

            //prep data for inquirer
            const employeeChoices = employeeResults.map(employee => ({ value: employee.id, name: employee.employee_name }));


            // Prompt the user to select an employee and a new manager
            inquirer
                .prompt([
                    {
                        type: 'list',
                        name: 'employeeId',
                        message: 'Select the employee to update their manager:',
                        choices: employeeChoices,
                    },
                    {
                        type: 'list',
                        name: 'newManagerId',
                        message: 'Select the new manager for the employee:',
                        choices: managerChoices,
                    },
                ])
                .then(answers => {
                    const { employeeId, newManagerId } = answers;

                    // Update the employee's manager in the database
                    const updateQuery = "UPDATE company_db.employee SET manager_id = ? WHERE id = ?";
                    db.query(updateQuery, [newManagerId, employeeId], (error, updateResults) => {
                        if (error) {
                            console.error(error);
                            return;
                        }

                        console.log(`Employee's manager updated successfully!`);

                        // Call the mainMenuFunction
                        mainMenuFunction();
                    });
                });
        })
    });
}

module.exports = updateManager