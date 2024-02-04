const mainMenu = require('../mainMenu.js');
const inquirer = require('inquirer');
const db = require("../../config/connect.js");

function deleteEmployee(mainMenuFunction) {
    // Get the list of all employees
    const employeesQuery = "SELECT id, CONCAT(first_name, ' ', last_name) AS employee_name FROM company_db.employee";
    db.query(employeesQuery, (error, employeeResults) => {
        if (error) {
            console.error("Error getting employees:", error);
            return;
        }

        //prep data for inquirer
        const employeeChoices = employeeResults.map(employee => ({ value: employee.id, name: employee.employee_name }));

        // Prompt the user to select an employee to delete
        inquirer
            .prompt([
                {
                    type: 'list',
                    name: 'employeeId',
                    message: 'Who would you like to delete?',
                    choices: employeeChoices,
                },
            ])
            .then(answers => {
                const { employeeId } = answers;

                // Delete the selected employee from the database
                const deleteQuery = "DELETE FROM company_db.employee WHERE id = ?";
                db.query(deleteQuery, [employeeId], (error, deleteResults) => {
                    if (error) {
                        console.error(error);
                        return;
                    }
                    //When an employee is deleted they may be a manager.  If this is the case null will appear in viewAllEmployees.  
                    //Alert the user of this so they can reassign subordinates
                    console.log(`Employee deleted successfully! \n\nIF EMPLOYEE WAS A MANAGER, PLEASE REASSIGN THEIR SUBORDINATES.\n\nFor reference select "View All Employees" and note the Supervisors marked "NULL" as the employees that need reassignment.\n\n `);

                    // Call the mainMenuFunction
                    mainMenuFunction();
                });
            });
    });
}

module.exports = deleteEmployee