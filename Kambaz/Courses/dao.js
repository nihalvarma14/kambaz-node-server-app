import { v4 as uuidv4 } from "uuid";

export default function CoursesDao(db) {
  function findAllCourses() {
    return db.courses;
  }
  
  function findCoursesForEnrolledUser(userId) {
    const { courses, enrollments } = db;
    const enrolledCourses = courses.filter((course) =>
      enrollments.some((enrollment) => 
        enrollment.user === userId && enrollment.course === course._id
      )
    );
    return enrolledCourses;
  }
  
  function createCourse(course) {
    const newCourse = { ...course, _id: uuidv4() };
    db.courses = [...db.courses, newCourse];
    return newCourse;
  }
  
  function deleteCourse(courseId) {
    const { courses, enrollments } = db;
    db.courses = courses.filter((course) => course._id !== courseId);
    db.enrollments = enrollments.filter(
      (enrollment) => enrollment.course !== courseId
    );
    return { success: true };
  }
  
  function updateCourse(courseId, courseUpdates) {
    const { courses } = db;
    const courseIndex = courses.findIndex((course) => course._id === courseId);
    if (courseIndex === -1) {
      throw new Error(`Course with ID ${courseId} not found`);
    }
    const course = courses[courseIndex];
    Object.assign(course, courseUpdates);
    db.courses[courseIndex] = course;
    return course;
  }
  
  function createModule(module) {
    const newModule = { ...module, _id: uuidv4() };
    db.modules = [...db.modules, newModule];
    return newModule;
  }
  
  function deleteModule(moduleId) {
    const { modules } = db;
    db.modules = modules.filter((module) => module._id !== moduleId);
    return { success: true };
  }

  return { 
    findAllCourses, 
    findCoursesForEnrolledUser,
    createModule,
    deleteModule,
    updateCourse,
    createCourse,     
    deleteCourse,
  };
}