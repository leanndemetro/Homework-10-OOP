// TODO: Write code to define and export the Engineer class.  HINT: This class should inherit from Employee.
//similar to manager
const Employee = require("./Employee");

class Engineer extends Employee {
    constructor(name, id, email, engineerGithub){
        super(name, id, email);
        this.github = engineerGithub
    }

    getRole() {
        return "Engineer"
    }

    get gitHub() {
        return this.engineerGithub
    }
}

module.exports= Engineer;