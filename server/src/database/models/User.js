import { Schema, model } from "mongoose";
// import logMiddleware from "../../api/middleware/logMidlleware";

const userSchema = new Schema(
  {
    userName: {
      type: String,
    },

    firstName: {
      type: String,
    },

    lastName: {
      type: String,
    },

    email: {
      type: String,
      index: true,
      required: true,
    },

    password: {
      type: String,
      select: false,
    },
    role: {
      type:Number,
      default:1, // 1. Project coodinator 2. Project Member 3. Examiners 4.Supervisors and Co-supervisors    
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },
  }
);

const User = model("User", userSchema);

export default User;
