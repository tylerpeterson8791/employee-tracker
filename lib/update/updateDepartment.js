const mainMenu = require('../mainMenu.js');
const inquirer = require('inquirer');
const db = require("../../config/connect.js");

function updateDepartment(mainMenuFunction) {
    // Get the list of all employees
    const employeesQuery = "SELECT id, CONCAT(first_name, ' ', last_name) AS employee_name FROM company_db.employee";
    db.query(employeesQuery, (error, employeeResults) => {
        if (error) {
            console.error(error);
            return;
        }

        //prep for inquirer
        const employeeChoices = employeeResults.map(employee => ({ value: employee.id, name: employee.employee_name }));

        // Get the list of all departments
        const departmentsQuery = "SELECT id, name FROM company_db.department";
        db.query(departmentsQuery, (error, departmentResults) => {
            if (error) {
                console.error(error);
                return;
            }

            //prep for inquirer
            const departmentChoices = departmentResults.map(department => ({ value: department.id, name: department.name }));

            // Prompt the user to select an employee and a new department
            inquirer
                .prompt([
                    {
                        type: 'list',
                        name: 'employeeId',
                        message: 'Select the employee to update:',
                        choices: employeeChoices,
                    },
                    {
                        type: 'list',
                        name: 'newDepartmentId',
                        message: 'Select the new department for the employee:',
                        choices: departmentChoices,
                    },
                ])
                .then(answers => {
                    const { employeeId, newDepartmentId } = answers;

                    // Update the employee's department in the database
                    const updateQuery = "UPDATE company_db.role SET department_id = ? WHERE id IN (SELECT role_id FROM company_db.employee WHERE id = ?)";
                    db.query(updateQuery, [newDepartmentId, employeeId], (error, updateResults) => {
                        if (error) {
                            console.error(error);
                            return;
                        }

                        console.log("Employee's department has been updated successfully!");

                        // Call the mainMenuFunction
                        mainMenuFunction();
                    });
                });
        });
    });
}

module.exports = updateDepartment;