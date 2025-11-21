import { v4 as uuidv4 } from 'uuid';  

export default function ModulesDao(db) {
  function findModulesForCourse(courseId) {
    const { modules } = db;
    if (!modules) return []; 
    return modules.filter((module) => module.course === courseId);
  }
  
  function createModule(module) {
    if (!db.modules) db.modules = [];
    const newModule = { ...module, _id: uuidv4() };
    db.modules = [...db.modules, newModule];
    return newModule;
  }
  
  function deleteModule(moduleId) {
    //const { modules } = db;  
    //db.modules = modules.filter((module) => module._id !== moduleId);  
    //return { success: true }; 
    if (!db.modules) {  
      return { success: false, error: "Modules not found" };
    }
    db.modules = db.modules.filter((module) => module._id !== moduleId);
    return { success: true };
  }

  
  function updateModule(moduleId, moduleUpdates) {
    const { modules } = db;
    if(!modules){
        return null;
    }
    const module = modules.find((module) => module._id === moduleId);
    if (!module) return null;
    Object.assign(module, moduleUpdates);
    return module;
  }

  return {
    findModulesForCourse,
    createModule,
    deleteModule,
    updateModule,
  };
}