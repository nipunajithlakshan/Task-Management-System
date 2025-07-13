import TaskRepository from "../database/repository/task-repository.js";

class TaskService {
  constructor() {
    this.repository = new TaskRepository();
  }

  async getAllTasks(userId) {
    try {
      return await this.repository.getAllTasks(userId); // pass userId to repo
    } catch (error) {
      return {
        success: false,
        message: error.message,
        data: error.stack,
      };
    }
  }

  async createTask(inputs) {
    const {
      task_title,
      task_description,
      priority,
      status,
      assigned_to,
      userId,
    } = inputs;

    try {
      const existingTask = await this.repository.getTask({ task_title });
      if (existingTask.success) {
        return {
          success: false,
          message: "This Task already registered.",
          data: null,
        };
      }
      const createTasks = await this.repository.createTask({
        task_title,
        task_description,
        priority,
        status,
        assigned_to,
        userId,
        isActive: true,
      });
      if (!createTasks.success) {
        return {
          success: false,
          message: createTasks.message,
          data: null,
        };
      }

      return {
        success: true,
        message: "Task Created Successfully.",
        data: createTasks.data,
      };
    } catch (error) {
      console.log(error);
    }
  }

  async viewTask(taskId) {
    try {
      return await this.repository.viewTask(taskId); // Pass taskId
    } catch (error) {
      console.log(error);
      return {
        success: false,
        message: error.message,
        data: error.stack,
      };
    }
  }

  async updateTask(taskId, updateFields) {
    try {
      const updated = await this.repository.updateTask(taskId, updateFields);
      return updated;
    } catch (error) {
      return {
        success: false,
        message: error.message,
        data: error.stack,
      };
    }
  }

  async deleteTask(taskId) {
    try {
      const deleted = await this.repository.deleteTask(taskId);
      return deleted;
    } catch (error) {
      return {
        success: false,
        message: error.message,
        data: error.stack,
      };
    }
  }
}

export default TaskService;
