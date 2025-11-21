export default function EnrollmentsRoutes(app, db) {
  // Enroll a user in a course
  const enrollUserInCourse = (req, res) => {
    const { userId, courseId } = req.params;
    const newEnrollment = {
      _id: `${userId}-${courseId}`,
      user: userId,
      course: courseId,
    };
    
    // Check if already enrolled
    const alreadyEnrolled = db.enrollments.find(
      (e) => e.user === userId && e.course === courseId
    );
    
    if (!alreadyEnrolled) {
      db.enrollments = [...db.enrollments, newEnrollment];
    }
    
    res.json(newEnrollment);
  };
  app.post("/api/users/:userId/courses/:courseId", enrollUserInCourse);

  // Unenroll a user from a course
  const unenrollUserFromCourse = (req, res) => {
    const { userId, courseId } = req.params;
    db.enrollments = db.enrollments.filter(
      (e) => !(e.user === userId && e.course === courseId)
    );
    res.sendStatus(204);
  };
  app.delete("/api/users/:userId/courses/:courseId", unenrollUserFromCourse);

  // Get all enrollments for a user
  const findEnrollmentsForUser = (req, res) => {
    const { userId } = req.params;
    const enrollments = db.enrollments.filter((e) => e.user === userId);
    res.json(enrollments);
  };
  app.get("/api/users/:userId/enrollments", findEnrollmentsForUser);

  const findEnrollmentsForCourse = (req, res) => {
    const { courseId } = req.params;
    const enrollments = db.enrollments.filter((e) => e.course === courseId);
    res.json(enrollments);
  };
  app.get("/api/courses/:courseId/enrollments", findEnrollmentsForCourse);
}