const mainMenu = require('../mainMenu.js');
const inquirer = require('inquirer');
const db = require("../../config/connect.js");

function addDepartment(mainMenuFunction) {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'departmentName',
                message: 'Enter the name of the new department:',
            },
        ])
        .then(answers => {
            const departmentName = answers.departmentName;

            // Insert the new department into the database
            const query = "INSERT INTO company_db.department (name) VALUES (?)";
            db.query(query, [departmentName], (error, results) => {
                if (error) {
                    console.error("Error executing the query:", error);
                    return;
                }

                console.log(`Department "${departmentName}" added successfully!`);

                // Call the mainMenuFunction
                mainMenuFunction();
            });
        });
}

module.exports = addDepartment