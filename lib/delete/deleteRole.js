const mainMenu = require('../mainMenu.js');
const inquirer = require('inquirer');
const db = require("../../config/connect.js");

function deleteRole(mainMenuFunction) {
    // Get the list of all roles
    const rolesQuery = "SELECT id, title FROM company_db.role";
    db.query(rolesQuery, (error, roleResults) => {
        if (error) {
            console.error(error);
            return;
        }

        //prep for inquirer
        const roleChoices = roleResults.map(role => ({ value: role.id, name: role.title }));

        // Prompt the user to select a role to delete
        inquirer
            .prompt([
                {
                    type: 'list',
                    name: 'roleId',
                    message: 'Which role would you like to delete?',
                    choices: roleChoices,
                },
            ])
            .then(answers => {
                const { roleId } = answers;

                // Delete the selected role from the database
                const deleteQuery = "DELETE FROM company_db.role WHERE id = ?";
                db.query(deleteQuery, [roleId], (error, deleteResults) => {
                    if (error) {
                        console.error(error);
                        return;
                    }

                    console.log(`Role deleted successfully!\n\nIF ROLE HAS ACTIVE EMPLOYEES REASSIGN THEIR ROLE.\n\nFor reference select "View All Employees" and note the Titles marked "NULL" as the employees that need reassignment.\n\n`);

                    // Call the mainMenuFunction
                    mainMenuFunction();
                });
            });
    });
}

module.exports = deleteRole