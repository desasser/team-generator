// TODO: Write code to define and export the Intern class.  HINT: This class should inherit from Employee.
const employee = require('./employee')

class Intern extends Employee {
  constructor(school){
    super(name, id, email)
    this.school = school;
  }

  getSchool() {
    
  }

  getRole(){
    return 'Intern';
  }
}

module.exports = Intern;