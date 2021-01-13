const Employee = require("./Employee");

// TODO: Write code to define and export the Manager class. HINT: This class should inherit from Employee.
const employee = require('./employee')

class Manager extends Employee {
  constructor(officeNumber){
    super(name, email)
    this.officeNumber = officeNumber;
  }

  getRole(){
    return 'Manager';
  }
}

module.exports = Manager;