const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

function promptInternInfo() {
    return inquirer.prompt([{
        type: 'input',
        name: 'name',
        message: 'Enter the employee name'
    }, {
        type: 'number',
        name: 'id',
        message: 'Enter the employee ID'
    }, {
        type: 'input',
        name: 'email',
        message: 'Enter the employee email'
    }, {
        type: 'input',
        name: 'school',
        message: 'Enter the employee school'
    }]).then(function(answers) {
        const employee = new Intern(answers.name, answers.id, answers.email, answers.school);
        employees.push(employee);
    });
}

function promptEngineerInfo() {
    return inquirer.prompt([{
        type: 'input',
        name: 'name',
        message: 'Enter the employee name'
    }, {
        type: 'number',
        name: 'id',
        message: 'Enter the employee ID'
    }, {
        type: 'input',
        name: 'email',
        message: 'Enter the employee email'
    }, {
        type: 'input',
        name: 'github',
        message: 'Enter the employee GitHub username'
    }]).then(function(answers) {
        const employee = new Engineer(answers.name, answers.id, answers.email, answers.github);
        employees.push(employee);
    });
}

function promptManagerInfo() {
    return inquirer.prompt([{
        type: 'input',
        name: 'name',
        message: 'Enter the employee name'
    }, {
        type: 'number',
        name: 'id',
        message: 'Enter the employee ID'
    }, {
        type: 'input',
        name: 'email',
        message: 'Enter the employee email'
    }, {
        type: 'number',
        name: 'officeNumber',
        message: 'Enter the employee office number'
    }]).then(function(answers) {
        const employee = new Manager(answers.name, answers.id, answers.email, answers.officeNumber);
        employees.push(employee);
    });
}

function promptEmployeeInfo() {
    return inquirer.prompt([{
        type: 'list',
        name: 'employeeType',
        message: 'Choose the employee type',
        choices: ['Intern', 'Engineer', 'Manager']
    }]).then(function(answers) {
        switch (answers.employeeType) {
            case 'Intern':
                return promptInternInfo();
    
            case 'Engineer':
                return promptEngineerInfo();
    
            case 'Manager':
                return promptManagerInfo();   
        }
    }).then(function() {
        return inquirer.prompt([{
            type: 'confirm',
            name: 'continue',
            message: 'Do you want to enter another employee?'
        }]).then(function(answers) {
            if (answers.continue) {
                return promptEmployeeInfo();
            }
        });
    });
}

const employees = [];
promptEmployeeInfo().then(function() {
    const html = render(employees);
    fs.writeFile(outputPath, html, function(err) {
        if (err) {
            console.error(err);
        } else {
            console.log('Done!');
        }
    });
});


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
