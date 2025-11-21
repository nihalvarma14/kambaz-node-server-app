import ModulesDao from "../Modules/dao.js";
export default function ModulesRoutes(app, db) {
  const dao = ModulesDao(db);
  const findModulesForCourse = (req, res) => {
    const { courseId } = req.params;
    const modules = dao.findModulesForCourse(courseId);
    res.json(modules);
  }
  app.get("/api/courses/:courseId/modules", findModulesForCourse);

  const deleteModule = (req, res) => {
  const { moduleId } = req.params;
  const status = dao.deleteModule(moduleId);
  res.send(status);
}
app.delete("/api/modules/:moduleId", deleteModule);

const updateModule = async (req, res) => {
  const { moduleId } = req.params;
  const moduleUpdates = req.body;
  const status = await dao.updateModule(moduleId, moduleUpdates);
  res.send(status);
}
app.put("/api/modules/:moduleId", updateModule);

const createModule = (req, res) => {
    const { courseId } = req.params;
    const module = {
      ...req.body,
      course: courseId,
    };
    const newModule = dao.createModule(module);
    res.json(newModule);
  }
  app.post("/api/courses/:courseId/modules", createModule);
}

//app.delete("/api/courses/:courseId/modules", (req, res) => {
   // const { moduleId } = req.params;
    //const ok = modulesDao.deleteModule(moduleId);
   // if (!ok) return res.status(404).json({ error: "Module not found" });
   // res.json({ ok: true });
 // });

