//this is a Inquirer LIST where we take the value and pass it into a function

//.then in the function we call another function where the value is user selected
//example answering viewEmployees will trigger that function
const inquirer = require('inquirer');
const viewRoles = require('./viewRoles.js');

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
                { name:'View All Roles' , value: "vr" },
                { name:'Add Employee' , value: "addEmployee" },
                { name:'Add Role' , value: "addRole" },
                { name:'Add Department' , value: "addDepartment" },
                { name:'Update Employee Role' , value: "updateRole" },
            ],
        },
    ])
    .then((answer) => {
        // console.log(answer)
        if (answer.userSelection  === "vr") {
            viewRoles();
        } else {
            console.log('Invalid Selection');
        }
    });
}

// mainMenu() - I'm testing calling it in the index.js

module.exports = mainMenu


//BUILD VIEWROLES AND REQUIRE IN TO TEST

//ON THE RIGHT TRACK BUT NOT SURE THE FUNCTION WILL CALL CORRECTLY