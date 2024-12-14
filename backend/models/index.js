const Sequelize = require('sequelize');
const config = require('../config/config.json');

const sequelize = new Sequelize(config.development);

const Student = sequelize.define('Student', {
  name: Sequelize.STRING,
  email: Sequelize.STRING,
  age: Sequelize.INTEGER,
});

const Course = sequelize.define('Course', {
  title: Sequelize.STRING,
  description: Sequelize.TEXT,
});

const Enrollment = sequelize.define('Enrollment', {
  studentId: Sequelize.INTEGER,
  courseId: Sequelize.INTEGER,
});


Student.belongsToMany(Course, { through: Enrollment });
Course.belongsToMany(Student, { through: Enrollment });

module.exports = { sequelize, Student, Course, Enrollment };
