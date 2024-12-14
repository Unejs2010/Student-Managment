const { sequelize, Student, Course, Enrollment } = require('./models');

(async () => {
  await sequelize.sync({ force: true }); 
  console.log('Database synced.');


  const student = await Student.create({ name: 'John Doe', email: 'john@example.com', age: 20 });
  const course = await Course.create({ title: 'Math 101', description: 'Intro to Mathematics' });
  await Enrollment.create({ studentId: student.id, courseId: course.id });

  console.log('Sample data inserted.');
})();
