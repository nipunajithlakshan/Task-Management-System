import { Schema, model } from "mongoose";
// import logMiddleware from "../../api/middleware/logMidlleware";

const UserSessionSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    lastActivityTime: {
      type: Date,
    },
    userName: {
      type: String,
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

const UserSession = model("UserSession", UserSessionSchema);

export default UserSession;
