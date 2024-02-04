const mainMenu = require('../mainMenu.js');
const inquirer = require('inquirer');
const db = require("../../config/connect.js");

function addRole(mainMenuFunction) {
    // Get the list of all available department names
    const departmentQuery = "SELECT name FROM company_db.department";
    db.query(departmentQuery, (error, departmentResults) => {
        if (error) {
            console.error(error);
            return;
        }
        
        //Use .map to extract department names.  departmentResults comes in an array so it needs to be converted to work in inquirer.
        const departmentChoices = departmentResults.map(department => department.name);
        

        // Prompt the user for role information
        inquirer
            .prompt([
                {
                    type: 'input',
                    name: 'roleName',
                    message: 'Enter the name of the role:',
                },
                {
                    type: 'input',
                    name: 'roleSalary',
                    message: 'Enter the salary for the role:',
                },
                {
                    type: 'list',
                    name: 'departmentName',
                    message: 'Select the department for the role:',
                    choices: departmentChoices,
                },
            ])
            .then(answers => {
                const { roleName, roleSalary, departmentName } = answers;
                // Need to convert departmentName into the department id
                // Get the department id from the department that the user selected
                const departmentIdQuery = "SELECT id FROM company_db.department WHERE name = ?";
                //run the query with department name is the wildcard. Get the resulting department id.
                db.query(departmentIdQuery, [departmentName], (error, departmentIdResults) => {
                    if (error) {
                        console.error(error);
                        return;
                    }
                    //departmentIdResults is an array so we need to parse out just the id itself.  There's only one thing in the array so target 0.
                    const departmentId = departmentIdResults[0].id;

                    // Add the new role into the database
                    const roleQuery = "INSERT INTO company_db.role (title, salary, department_id) VALUES (?, ?, ?)";
                    //three wildcards in this one.  roleName, roleSalary and the newly created departmentId
                    db.query(roleQuery, [roleName, roleSalary, departmentId], (error, roleResults) => {
                        if (error) {
                            console.error("Error executing the query:", error);
                            return;
                        }

                        console.log(`Role "${roleName}" added successfully!`);

                        // Call the mainMenuFunction
                        mainMenuFunction();
                    });
                });
            });
    });
}

module.exports = addRole