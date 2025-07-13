import { model, Model, Schema, Types } from "mongoose";

const taskSchema = new Schema(
  {
    task_title: {
      type: String,
    },

    task_description: {
      type: String,
    },

    priority: {
      type: String,
    },

    status: {
      type: String,
    },
    assigned_to: {
      type: String,
    },
    isActive: {
      type: Boolean,
    },
  },
  {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },
  }
);

const Tasks = model("Tasks", taskSchema);

export default Tasks;
