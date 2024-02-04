const mainMenu = require('../mainMenu.js');
const inquirer = require('inquirer');
const db = require("../../config/connect.js");

function addEmployee(mainMenuFunction) {
    // Get the list of available roles
    const rolesQuery = "SELECT id, title FROM company_db.role";
    db.query(rolesQuery, (error, roleResults) => {
        if (error) {
            console.error("Error getting roles:", error);
            return;
        }

        //format this to use in inquirer.  Value is the role id and the user sees the role title for selection.
        const roleChoices = roleResults.map(role => ({ value: role.id, name: role.title }));

        // Get the list of available managers.  Using CONCAT to combine first and last name to display AS manager.name.
        // Only grab employees where NULL is the value for manager_id.  If they don't have a manager, they are a manager.
        const managersQuery = "SELECT id, CONCAT(first_name, ' ', last_name) AS manager_name FROM company_db.employee WHERE manager_id IS NULL";
        db.query(managersQuery, (error, managerResults) => {
            if (error) {
                console.error("Error getting managers:", error);
                return;
            }

            //the managerResults comes in an array like this { id: 7, manager_name: 'Julie Raymond' } .  Need to extract the data and prep it for inquirer
            const managerChoices = managerResults.map(manager => ({ value: manager.id, name: manager.manager_name }));
            //Add in a none option to the end of the list for adding employees that are managers themselves
            managerChoices.push({ value: null, name: 'IS A MANAGER THEMSELVES' });

            // Prompt the user for employee information
            inquirer
                .prompt([
                    {
                        type: 'input',
                        name: 'firstName',
                        message: 'Enter the first name of the employee:',
                    },
                    {
                        type: 'input',
                        name: 'lastName',
                        message: 'Enter the last name of the employee:',
                    },
                    {
                        type: 'list',
                        name: 'roleId',
                        message: 'Select the role for the employee:',
                        choices: roleChoices,
                    },
                    {
                        type: 'list',
                        name: 'managerId',
                        message: 'Select the manager for the employee:',
                        choices: managerChoices,
                    },
                ])
                .then(answers => {
                    const { firstName, lastName, roleId, managerId } = answers;

                    // Run a query taking the four values and adding them into the database
                    const employeeQuery = "INSERT INTO company_db.employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)";
                    db.query(employeeQuery, [firstName, lastName, roleId, managerId], (error, employeeResults) => {
                        if (error) {
                            console.error(error);
                            return;
                        }

                        console.log(`Employee "${firstName} ${lastName}" added successfully!`);

                        // Call the mainMenuFunction
                        mainMenuFunction();
                    });
                });
        });
    });
}

module.exports = addEmployee
