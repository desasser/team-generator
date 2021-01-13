const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const employeeArr = [];

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

function firstQuestion() {
  inquirer.prompt([
    {
      type: 'list',
      message: 'What type of employee would you like to add?',
      name: 'nextEmployee',
      choices: ['Manager', 'Engineer', 'Intern'],
    },
    {
      type: 'input',
      message: 'What is your name?',
      name: 'name'
    },
    {
      type: 'input',
      message: 'What is your ID?',
      name: 'id'
    },
    {
      type: 'input',
      message: 'What is your email?',
      name: 'email'
    }
  ]).then((response) => {

    switch (response.nextEmployee) {
      case "Manager":
        addManager(response);
        break;

      case "Engineer":
        addEngineer(response);
        break;

      case "Intern":
        addIntern(response);
        break;

      default:
        break;
    }
  })
}

function anotherEmployee() {
  inquirer.prompt(
    {
      type: 'list',
      message: 'Do you have anymore employees to add?',
      name: 'addEmployee',
      choices: ['Yes', 'No'],
    }).then(response => {
      if (response.addEmployee === 'Yes') {
        firstQuestion();
      } else {
        const data = render(employeeArr);
        fs.writeFile(outputPath, data, (err) => {
          if (err) throw err;
          console.log('The file has been saved!');
        });
      }
    });
}

function addManager(data) {
  inquirer.prompt(

    {
      type: 'input',
      message: 'What is your office number?',
      name: 'officeNumber'
    }
  ).then(managerResponse => {
    const newManager = new Manager(data.name, data.id, data.email, managerResponse.officeNumber);
    employeeArr.push(newManager);

    anotherEmployee();
  })
}

function addEngineer(data) {
  inquirer.prompt([

    {
      type: 'input',
      message: 'What is your Github username?',
      name: 'githubUsername'
    }
  ]).then(engineerResponse => {
    const newEngineer = new Engineer(data.name, data.id, data.email, engineerResponse.githubUsername);
    employeeArr.push(newEngineer);
    anotherEmployee();
  })
}

function addIntern(data) {
  inquirer.prompt([

    {
      type: 'input',
      message: 'What is your school?',
      name: 'school'
    }
  ]).then(internResponse => {
    const newIntern = new Intern(data.name, data.id, data.email, internResponse.school);
    employeeArr.push(newIntern);
    anotherEmployee();
  })
}

firstQuestion();
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

