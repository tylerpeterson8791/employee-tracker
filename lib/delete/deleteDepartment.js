const mainMenu = require('../mainMenu.js');
const inquirer = require('inquirer');
const db = require("../../config/connect.js");

console.log(`\n\nNOTE: DELETING A DEPARTMENT REMOVES ALL EMPLOYEES IN THE DEPARTMENT\n\nIf you do NOT want to do this please press "control + C" to escape and reassign employees\n\n`)

function deleteDepartment(mainMenuFunction) {
    // Get the list of all departments
    const departmentsQuery = "SELECT id, name FROM company_db.department";
    db.query(departmentsQuery, (error, departmentResults) => {
        if (error) {
            console.error("Error getting departments:", error);
            return;
        }
        
        //prep for inquirer
        const departmentChoices = departmentResults.map(department => ({ value: department.id, name: department.name }));

        // Prompt the user to select a department to delete
        inquirer
            .prompt([
                {
                    type: 'list',
                    name: 'departmentId',
                    message: 'Which department would you like to delete?',
                    choices: departmentChoices,
                },
            ])
            .then(answers => {
                const { departmentId } = answers;

                // Delete the selected department from the database
                const deleteQuery = "DELETE FROM company_db.department WHERE id = ?";
                db.query(deleteQuery, [departmentId], (error, deleteResults) => {
                    if (error) {
                        console.error(error);
                        return;
                    }

                    console.log(`Department deleted successfully!`);

                    // Call the mainMenuFunction
                    mainMenuFunction();
                });
            });
    });
}

module.exports = deleteDepartment