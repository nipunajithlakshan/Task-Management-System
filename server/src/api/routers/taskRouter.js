import express from "express";
const router = express.Router();
import auth from "../../api/Middleware/auth.js";
import TaskCtrl from "../../api/controllers/TaskCtrl.js";

router.post("/create-task", auth, TaskCtrl.createTask);
router.get("/tasks",  TaskCtrl.getAllTasks);
router.get("/view-task", auth, TaskCtrl.viewTask);
router.put("/edit-task", auth, TaskCtrl.updateTask);
router.delete("/delete-task", auth, TaskCtrl.deleteTask);

export default router;
