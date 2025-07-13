import User from "../models/User.js";
import UserSession from "../models/UserSession.js";

class UserRepository {
  async getUser(filters) {
    try {
      const existingUser = await User.findOne(filters).lean();

      return {
        success: !!existingUser,
        message: existingUser ? "User fetched!" : "User not found.",
        data: existingUser || null,
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
  async registerUser(inputs) {
    try {
      const newUser = new User(inputs);
      const createdUser = await newUser.save();

      return {
        success: true,
        message: "User registered successfully.",
        data: createdUser,
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

  async getUserByEmailSignIn(email) {
    try {
      const user = await User.findOne({
        email: { $regex: new RegExp("^" + email + "$", "i") },
        isActive: true,
      })
        .select("+password")
        .lean();
      if (!user) {
        return {
          success: false,
          message: "User not found!",
          data: null,
        };
      }
      return {
        success: true,
        message: "User found.",
        data: user,
      };
    } catch (error) {
      return {
        success: false,
        message: error,
        data: null,
      };
    }
  }

  async updateUserByEmail(userInputs) {
    try {
      const { email } = userInputs;

      const filter = {
        email: { $regex: new RegExp("^" + email + "$", "i") },
      };
      const update = {
        $set: { ...userInputs },
      };

      const result = await User.findOneAndUpdate(filter, update, {
        new: true,
      });

      if (result) {
        return {
          success: true,
          message: "User updated successfully!",
          data: result,
        };
      } else {
        return {
          success: false,
          message: "User not found!",
          data: null,
        };
      }
    } catch (error) {
      console.log(error);
      return {
        success: false,
        message: error.message,
        data: error.stack,
      };
    }
  }

  async createUserSession(inputs) {
    try {
      const newSession = new UserSession(inputs);
      const createdSession = await newSession.save();

      return {
        success: true,
        message: "Session created successfully!",
        data: createdSession,
      };
    } catch (error) {
      console.log(error);
      return {
        success: false,
        message: error.message,
        data: error.stack,
      };
    }
  }

  async viewUser(inputs) {
    const { userId } = inputs;
    try {
      const user = await User.findOne({ _id: userId });

      return {
        success: true,
        message: "user fetch successfully",
        data: user,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
        data: error.stack,
      };
    }
  }

  async addNewUser(inputs) {
    try {
      const newUser = new User(inputs);
      const createdUser = await newUser.save();

      return {
        success: true,
        message: "User registered successfully.",
        data: createdUser,
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

  async removeUserSession(filters) {
    try {
      const user = await UserSession.updateMany(filters, {
        isActive: false,
      });

      console.log("hi",user)

      return {
        success: true,
        message: "User signed out successfully",
        data: null,
      };
    } catch (error) {
      console.error("hellow",error);
      return {
        success: false,
        message: error.message,
        data: error.stack,
      };
    }
  }
}

export default UserRepository;
