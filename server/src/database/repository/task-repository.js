import Task from "../models/Tasks.js";
import { v4 as uuidv4 } from "uuid";

class TaskRepository {
  async getTask(filters) {
    try {
      const existingTask = await Task.findOne(filters).lean();

      return {
        success: !!existingTask,
        message: existingTask ? "Task fetched!" : "Task not found.",
        data: existingTask || null,
      };
    } catch (error) {
      console.error(error);
      return {
        success: false,
        message: error.message,
        data: error.stack,
      };
    }
  }
  async getAllTasks(userId) {
    try {
      const tasks = await Task.find({ userId, isActive: true }).lean();

      return {
        success: true,
        message: "User's tasks fetched successfully",
        data: tasks,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
        data: error.stack,
      };
    }
  }
  async createTask(inputs) {
    try {
      const newTask = new Task(inputs);
      const createdTask = await newTask.save();

      return {
        success: true,
        message: "Project registered successfully.",
        data: createdTask,
      };
    } catch (error) {
      console.error(error);
      return {
        success: false,
        message: error.message,
        data: error.stack,
      };
    }
  }

  async viewTask(taskId) {
    try {
      const task = await Task.findOne({ _id: taskId }).lean(); // Correct query format

      if (!task) {
        return {
          success: false,
          message: "Task not found",
          data: null,
        };
      }

      return {
        success: true,
        message: "Task fetched successfully",
        data: task,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
        data: error.stack,
      };
    }
  }

  async updateTask(taskId, updateFields) {
    try {
      const updatedTask = await Task.findByIdAndUpdate(taskId, updateFields, {
        new: true,
        runValidators: true,
      }).lean();

      if (!updatedTask) {
        return {
          success: false,
          message: "Task not found for update",
          data: null,
        };
      }

      return {
        success: true,
        message: "Task updated successfully",
        data: updatedTask,
      };
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
      const deletedTask = await Task.findByIdAndDelete(taskId).lean();

      if (!deletedTask) {
        return {
          success: false,
          message: "Task not found for deletion",
          data: null,
        };
      }

      return {
        success: true,
        message: "Task deleted successfully",
        data: deletedTask,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
        data: error.stack,
      };
    }
  }
}

export default TaskRepository;
