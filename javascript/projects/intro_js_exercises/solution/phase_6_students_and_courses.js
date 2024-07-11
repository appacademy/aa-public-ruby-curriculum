function Student (fname, lname) {
  this.fname = fname;
  this.lname = lname;
  this.courses = [];
}

Student.prototype.name = function () {
  return `${this.fname} ${this.lname}`;
};

Student.prototype.enroll = function (course) {
  if (!this.courses.includes(course)) {
    this.courses.forEach(crs => {
      if (crs.conflictsWith(course)) {
        throw "Course conflict";
      }
    });

    this.courses.push(course);
    course.addStudent(this);
  }
};

Student.prototype.courseLoad = function () {
  const courseLoad = {};

  this.courses.forEach(course => {
    let dpt = course.department;
    courseLoad[dpt] = courseLoad[dpt] || 0;
    courseLoad[dpt] += course.credits;
  });

  return courseLoad;
};

function Course (name, department, credits, days, block) {
  this.name = name;
  this.department = department;
  this.credits = credits;
  this.days = days;
  this.block = block;
  this.students = [];
}

Course.prototype.addStudent = function (student) {
  if (this.students.indexOf(student) === -1) {
    this.students.push(student);
    student.enroll(this);
  }
};

Course.prototype.conflictsWith = function (other) {
  if (this.block !== other.block) { return false; }

  return this.days.some(day => other.days.indexOf(day) !== -1 );
};

//Comment in the code below to run

// let student1 = new Student("Nigel", "Leffler");
// let course1 = new Course("101", "CS", 3, ["mon", "wed", "fri"], 1);
// let course2 = new Course("201", "CS", 3, ["wed"], 1);
// let course3 = new Course("301", "ENG", 3, ["tue"], 1);
// let course4 = new Course("401", "BIO", 3, ["mon", "wed", "fri"], 2);
// console.log(student1.name());
// student1.enroll(course1);
// student1.enroll(course3);
// student1.enroll(course2);
// console.log(student1.courseLoad());
// console.log('should be true = ' + course1.conflictsWith(course2));
// console.log('should be false = ' + course1.conflictsWith(course3));
// console.log('should be false = ' + course1.conflictsWith(course4));
