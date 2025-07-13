import TaskService from "../../services/task-service.js";

const taskService = new TaskService();
const TaskCtrl = {
  createTask: async (req, res, next) => {
    const { task_title, task_description, priority, status, assigned_to } =
      req.body;
    const userId = req.user;

    try {
      const response = await taskService.createTask({
        task_title,
        task_description,
        priority,
        status,
        assigned_to,
        userId,
      });
      // Return the response
      return res.status(200).json({
        success: response.success,
        message: response.message,
        data: response.data,
      });
    } catch (error) {
      next(error);
    }
  },

  getAllTasks: async (req, res, next) => {
    const userId = req.user; // populated by auth middleware

    try {
      const result = await taskService.getAllTasks(userId);
      return res.status(result.success ? 200 : 500).json(result);
    } catch (error) {
      next(error);
    }
  },

  viewTask: async (req, res, next) => {
    const { taskId } = req.query; // Extract projectId directly

    if (!taskId) {
      return res
        .status(400)
        .json({ success: false, message: "Task ID is required" });
    }

    try {
      const task = await taskService.viewTask(taskId); // Pass projectId directly to service
      return res.status(200).json(task); // Return the project response
    } catch (error) {
      next(error);
    }
  },

  updateTask: async (req, res, next) => {
    const { taskId } = req.query;
    const updateFields = req.body;

    if (!taskId) {
      return res
        .status(400)
        .json({ success: false, message: "Task ID is required" });
    }

    try {
      const result = await taskService.updateTask(taskId, updateFields);
      return res.status(result.success ? 200 : 404).json(result);
    } catch (error) {
      next(error);
    }
  },

  deleteTask: async (req, res, next) => {
    const { taskId } = req.query;

    if (!taskId) {
      return res
        .status(400)
        .json({ success: false, message: "Task ID is required" });
    }

    try {
      const result = await taskService.deleteTask(taskId);
      return res.status(result.success ? 200 : 404).json(result);
    } catch (error) {
      next(error);
    }
  },
};

export default TaskCtrl;
