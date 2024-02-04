const mainMenu = require('../mainMenu.js');
const inquirer = require('inquirer');
const db = require("../../config/connect.js");

function viewEmployeesByDepartment(mainMenuFunction) {
    // Get the list of departments
    const departmentsQuery = "SELECT id, name FROM company_db.department";
    db.query(departmentsQuery, (error, departmentResults) => {
        if (error) {
            console.error(error);
            return;
        }
        //prep for inquirer
        const departmentChoices = departmentResults.map(department => ({ value: department.id, name: department.name }));

        // Prompt the user to select a department
        inquirer
            .prompt([
                {
                    type: 'list',
                    name: 'departmentId',
                    message: 'Please select a department:',
                    choices: departmentChoices,
                },
            ])
            .then(answers => {
                const { departmentId } = answers;

                // Get detailed information about employees in the selected department
                const employeesQuery = `
                    SELECT employee.id AS 'EMPLOYEE ID', employee.first_name AS 'FIRST NAME', employee.last_name AS 'LAST NAME', role.title AS 'TITLE', role.salary AS 'SALARY', department.name AS 'DEPARTMENT' FROM company_db.employee JOIN company_db.role ON employee.role_id = role.id JOIN company_db.department ON role.department_id = department.id WHERE department.id = ?;
                `;

                db.query(employeesQuery, [departmentId], (error, employeeResults) => {
                    if (error) {
                        console.error(error);
                        return;
                    }

                    console.log(`Employees in the selected department:`);

                    // Display the detailed table of employees
                    console.table(employeeResults);

                    // Call the mainMenuFunction
                    mainMenuFunction();
                });
            });
    });
}

module.exports = viewEmployeesByDepartment