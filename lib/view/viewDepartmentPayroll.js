const mainMenu = require('../mainMenu.js');
const inquirer = require('inquirer');
const db = require("../../config/connect.js");

function viewDepartmentPayroll(mainMenuFunction) {
    // Get the list of all departments
    const departmentsQuery = "SELECT id, name FROM company_db.department";
    db.query(departmentsQuery, (error, departmentResults) => {
        if (error) {
            console.error(error);
            return;
        }

        // prep data for inquirer
        const departmentChoices = departmentResults.map(department => ({ value: department.id, name: department.name }));

        // Prompt the user to select a department
        inquirer
            .prompt([
                {
                    type: 'list',
                    name: 'departmentId',
                    message: 'Select the department to view payroll:',
                    choices: departmentChoices,
                },
            ])
            .then(answers => {
                const { departmentId } = answers;

                // Get the total payroll for the selected department
                const payrollQuery = `SELECT SUM(role.salary) AS total_payroll FROM company_db.employee JOIN company_db.role ON employee.role_id = role.id WHERE role.department_id = ?;`;

                db.query(payrollQuery, [departmentId], (error, payrollResults) => {
                    if (error) {
                        console.error(error);
                        return;
                    }
                    //there's only one item in this new array, target index 0
                    const totalPayroll = payrollResults[0].total_payroll;

                    // Get rundown of all employees in the department
                    const employeesQuery = `SELECT employee.first_name AS 'FIRST NAME', employee.last_name AS 'LAST NAME', role.title AS TITLE, role.salary AS SALARY FROM company_db.employee JOIN company_db.role ON employee.role_id = role.id WHERE role.department_id = ?;`;

                    db.query(employeesQuery, [departmentId], (error, employeeResults) => {
                        if (error) {
                            console.error(error);
                            return;
                        }

                        

                        // Display the detailed table of employees
                        console.table(employeeResults);
                        console.log(`TOTAL PAYROLL for the selected department is: $${totalPayroll}\n`);
                        // Call the mainMenuFunction
                        mainMenuFunction();
                    });
                });
            });
    });
}

module.exports = viewDepartmentPayroll;