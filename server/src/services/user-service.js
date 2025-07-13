import jwt from "jsonwebtoken";
import UserRepository from "../database/repository/user-repository.js";

class UserService {
  constructor() {
    this.repository = new UserRepository();
  }

  async registerUser(inputs) {
    const { userName, firstName, lastName, email, password, role, userId } =
      inputs;

    try {
      // Check if a user with the same email already exists
      const existingUser = await this.repository.getUser({ email });
      if (existingUser.success) {
        return {
          success: false,
          message: "Email is already registered.",
          data: null,
        };
      }

      

      // Create a new user
      const createUser = await this.repository.registerUser({
        _id: userId,
        userName,
        firstName,
        lastName,
        email,
        password,
        role,
        isActive: true,
      });

      if (!createUser.success) {
        return {
          success: false,
          message: createUser.message,
          data: null,
        };
      }

      return {
        success: true,
        message: "User registered successfully.",
        data: createUser.data,
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

  async signIn(userInputs) {
    const { email, password } = userInputs;
    try {
      const user = await this.repository.getUserByEmailSignIn(email);

      if (!user.success) {
        return {
          success: false,
          message: "Email or Password is wrong!",
          data: null,
        };
      }

      if (user?.data?.password !== password) {
        return {
          success: false,
          message: "Email or Password is wrong!",
          data: null,
        };
      }

      const deviceData = await this.repository.updateUserByEmail({
        email,
      });
      if (!deviceData.success) {
        return {
          success: false,
          message: deviceData.message,
          data: null,
        };
      }

      // Create System user sessions
      const sessionData = {
        userId: user.data._id,
        email: user.data.email,
        lastActivityTime: new Date(),
        userName: user.data.userName,
        userId: user.data._id,
        // role: user.data.role,
      };

      const createdSession = await this.repository.createUserSession(
        sessionData
      );
      if (!createdSession.success) {
        return {
          success: false,
          message: "Error creating session!",
          data: null,
        };
      }
      // Issue JWT token
      const token = jwt.sign(
        {
          sessionId: createdSession.data._id,
        },
        process.env.JWT_SECRET
      );

      return {
        success: true,
        message: "Authentication successful!",
        data: {
          UserId: user.data._id,
          role: user.data.role,
          token: token,
        },
      };
    } catch (error) {
      console.log(error);
      return {
        success: false,
        message: "error.message",
        data: error.stack,
      };
    }
  }

  async signOut({ userId, sessionId }) {
    try {
      return await this.repository.removeUserSession({
        _id: sessionId,
        userId,
      });
    } catch (error) {
      console.log(error);
    }
  }

  async viewUser(inputs) {
    try {
      return await this.repository.viewUser(inputs);
    } catch (error) {
      console.log(error);
      return {
        success: false,
        message: error.message,
        data: error.stack,
      };
    }
  }

  async addNewUser(inputs) {
    const { userName, firstName, lastName, email, password, role, userId } =
      inputs;

    try {
      const res = await this.repository.getUser({ _id: userId });

      const userRole = res.data.role;

      if (userRole !== 1) {
        return {
          success: false,
          message: "Only Project Coordinator can add user",
          data: null,
        };
      }

      // Check if a user with the same email already exists
      const existingUser = await this.repository.getUser({ email });
      if (existingUser.success) {
        return {
          success: false,
          message: "Email is already registered.",
          data: null,
        };
      }

      // add a new user
      const createUser = await this.repository.addNewUser({
        userName,
        firstName,
        lastName,
        email,
        password,
        role,
        isActive: true,
      });

      if (!createUser.success) {
        return {
          success: false,
          message: createUser.message,
          data: null,
        };
      }

      return {
        success: true,
        message: "User Added successfully.",
        data: createUser.data,
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
}

export default UserService;
