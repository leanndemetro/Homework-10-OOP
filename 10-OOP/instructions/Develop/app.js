//creates a new variable called manager that requires the manager.js file be linked to this file
const Manager = require("./lib/Manager");
// creates a new variable called Enginner that requires the engineer.js file be linked to this file
const Engineer = require("./lib/Engineer");
//// creates a new variable called Intern that requires the intern.js file be linked to this file
const Intern = require("./lib/Intern");
//creates a new variable called iquirer, that requires npm inquirer package 
const inquirer = require("inquirer");
//creates new variable called path that requires npm path package
const path = require("path");

//declare constants for output for render file
const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

// //creates a new variable called render that requires the htmlRenderer file
const render = require("./lib/htmlRenderer");
const fs = require("fs");

//creates an empty array called teamMembers
const teamMembers = [];
//creates an empty array called idArray
const idArray = [];

createManager();
// this is a nested function that creates a new manager if selected
function createManager() {
    //print the string
    console.log("Please build your team");
    //creates a new inquirer prompt input with the listed question
    inquirer.prompt([
        {
            type: "input",
            name: "managerName",
            message: "What is your manager's name?",
            validate: answer => {
                if (answer !== "") {
                    return true;
                }
                return "Please enter a name";
            }
        },
        {
            type: "number",
            name: "managerId",
            message: "What is your manager's ID number?",
        },
        {
            type: "email",
            name: "managerEmail",
            message: "What is your manager's Email address?",
            validate: answer => {
                if (answer !== "") {
                    return true;
                }
                return "Please enter valid e-mail address."
            }
        },
        {
            type: "number",
            name: "officeNumber",
            message: "What is your manager's office number?",
        }
    ]).then(answer => {
        const manager = new Manager(answer.managerName, answer.managerId, answer.managerEmail, answer.officeNumber);
        teamMembers.push(manager);
        idArray.push(answer.managerId);
        //calls teamMemberChoice function
        teamMemberChoice();

    });


}

// this is a nested function that creates a new manager if selected
function teamMemberChoice() {
    //creates a new inquirer prompt input with the listed question
    inquirer.prompt([
        {
            type: "list",
            name: "memberChoice",
            message: "which type of team member would you like to add?",
            choices: [
                "engineer",
                "intern",
                "I dont want any more team members"
            ]
        }
    ]).then(answer => {
        if (answer.memberChoice === "engineer") {
            createEngineer();
        };

        if (answer.memberChoice === "intern") {
            createIntern();
        };
        if (answer.memberChoice === "I dont want any more team members") {
            console.log(teamMembers);
            renderTeam();
        }
    })





    // this is a nested function that creates a new manager if selected
    function createEngineer() {
        //creates a new inquirer prompt input with the listed question
        inquirer.prompt([
            {
                type: "input",
                name: "engineerName",
                message: "What is your engineer's name?",
                validate: answer => {
                    if (answer !== "") {
                        return true;
                    }
                    return "Please enter a name";
                }
            },
            {
                type: "number",
                name: "engineerId",
                message: "What is your engineer's ID number?",
            },
            {
                type: "email",
                name: "engineerEmail",
                message: "What is your engineer's Email address?",
                validate: answer => {
                    if (answer !== "") {
                        return true;
                    }
                    return "Please enter valid e-email address."
                }
            },
            {
                type: "URL",
                name: "github",
                message: "What is your engineers's Github username?",
            }

        ]).then(answer => {
            const engineer = new Engineer(answer.engineerName, answer.engineerId, answer.engineerEmail, answer.engineerGithub);
            teamMembers.push(engineer);
            idArray.push(answer.engineerId);
            teamMemberChoice();

        });

    }

    // this is a nested function that creates a new manager if selected
    function createIntern() {
        //creates a new inquirer prompt input with the listed question
        inquirer.prompt([
            {
                type: "input",
                name: "internName",
                message: "What is your intern's name?",
                validate: answer => {
                    if (answer !== "") {
                        return true;
                    }
                    return "Please enter a name";
                }
            },
            {
                type: "number",
                name: "internId",
                message: "What is your intern's ID number?",
            },
            {
                type: "email",
                name: "internEmail",
                message: "What is your interns's Email address?",
                validate: answer => {
                    if (answer !== "") {
                        return true;
                    }
                    return "Please enter valid e-email address."
                }
            },
            {
                type: "input",
                name: "school",
                message: "What school does your intern go to?",
            }

        ]).then(answer => {
            const intern = new Intern(answer.internName, answer.internId, answer.internEmail, answer.school);
            teamMembers.push(intern);
            idArray.push(answer.internId);
            teamMemberChoice();


        });
    }
}


//function that takes data and renders to a new file
function renderTeam() {
    const renderedTeam = render(teamMembers)
    fs.writeFile(outputPath, renderedTeam, function (err) {
        if (err) return console.log(err) 
    }); 
    console.log("sucessful write");
}















