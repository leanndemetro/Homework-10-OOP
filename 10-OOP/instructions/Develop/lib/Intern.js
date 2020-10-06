// TODO: Write code to define and export the Intern class.  HINT: This class should inherit from Employee.
//similar to manager 
const Employee = require("./Employee");

class Intern extends Employee {
    constructor(name, id, email, internSchool){
        super(name, id, email);
        this.internSchool = internSchool
    }

    getRole() {
        return "Intern"
    }

    getinternSchool() {
        return this.internSchool
    }
}

module.exports= Intern;