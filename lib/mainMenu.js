const inquirer = require('inquirer');
const viewEmployees = require('./view/viewEmployees.js');
const viewDepartments = require('./view/viewDepartments.js');
const viewRoles = require('./view/viewRoles.js');
const viewEmployeesByManager = require('./view/viewEmployeesByManager.js');
const viewEmployeesByDepartment = require('./view/viewEmployeesByDepartment.js');
const addEmployee = require('./add/addEmployee.js');
const addDepartment = require('./add/addDepartment.js');
const addRole = require('./add/addRole.js');
const updateRole = require('./update/updateRole.js');
const updateDepartment = require('./update/updateDepartment.js');
const updateManager = require('./update/updateManager.js');
const deleteEmployee = require('./delete/deleteEmployee.js');
const deleteDepartment = require('./delete/deleteDepartment.js');
const deleteRole = require('./delete/deleteRole.js');

function mainMenu() {
    inquirer
    .prompt([
        {
            type: "list",
            message: "What would you like to do?",
            name: "userSelection",
            choices: [
                { name:'View All Employees' , value: "viewEmployees" }, 
                { name:'View All Departments' , value: "viewDepartments" },
                { name:'View All Roles' , value: "viewRoles" },
                { name:'View Employees by Manager' , value: "viewEmployeesByManager" },
                { name:'View Employees by Department' , value: "viewEmployeesByDepartment" },
                { name:'Add Employee' , value: "addEmployee" },
                { name:'Add Department' , value: "addDepartment" },
                { name:'Add Role' , value: "addRole" },
                { name:'Update Employee Role' , value: "updateRole" },
                { name:'Update Department' , value: "updateDepartment" },
                { name:'Update Manager of Employee' , value: "updateManager" },
                { name:'DELETE Employee' , value: "deleteEmployee" },
                { name:'DELETE Department' , value: "deleteDepartment" },
                { name:'DELETE Role' , value: "deleteRole" },
                { name:'EXIT APPLICATION' , value: "exit" },
            ],
        },
    ])
    .then((answer) => {
        if (answer.userSelection  === "viewEmployees") {
            viewEmployees(mainMenu);
        } else if (answer.userSelection  === "viewDepartments") {
            viewDepartments(mainMenu);
        } else if (answer.userSelection  === "viewRoles") {
            viewRoles(mainMenu);
        } else if (answer.userSelection  === "viewEmployeesByManager") {
            viewEmployeesByManager(mainMenu);
        } else if (answer.userSelection  === "viewEmployeesByDepartment") {
            viewEmployeesByDepartment(mainMenu);
        } else if (answer.userSelection  === "addEmployee") {
            addEmployee(mainMenu);
        } else if (answer.userSelection  === "addDepartment") {
            addDepartment(mainMenu);
        } else if (answer.userSelection  === "addRole") {
            addRole(mainMenu);
        } else if (answer.userSelection  === "updateDepartment") {
            updateDepartment(mainMenu);
        } else if (answer.userSelection  === "updateRole") {
            updateRole(mainMenu);
        } else if (answer.userSelection  === "updateManager") {
            updateManager(mainMenu);
        } else if (answer.userSelection  === "deleteEmployee") {
            deleteEmployee(mainMenu);
        } else if (answer.userSelection  === "deleteDepartment") {
            deleteDepartment(mainMenu);
        } else if (answer.userSelection  === "deleteRole") {
            deleteRole(mainMenu);
        } else {
            console.log("GOODBYE!!!");
            process.exit();
        }
    });
}


module.exports = mainMenu
