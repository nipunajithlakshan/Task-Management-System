import validator from "validator";
import UserService from "../../services/user-service.js";

const userService = new UserService();

const UserCtrl = {
  registerUser: async (req, res, next) => {
    const { userName, firstName, lastName, email, password, role, userId } =
      req.body;

    try {
      // Call the service layer
      const response = await userService.registerUser({
        userName,
        firstName,
        lastName,
        email,
        password,
        role,
        userId,
      });

      // Return the response
      return res.status(200).json({
        success: response.success,
        message: response.message,
        data: response.data,
      });
    } catch (error) {
      next(error); // Pass errors to error-handling middleware
    }
  },

  signIn: async (req, res, next) => {
    const email = req.body.email ? req.body.email.trim() : null;
    const password = req.body.password ? req.body.password : null;

    // Validation
    if (!email || !password) {
      const missingFields = [];
      if (!email) missingFields.push("email");
      if (!password) missingFields.push("password");

      const errorMessage = `Required fields are missing: ${missingFields.join(
        ", "
      )}`;
      return res.status(200).json({
        success: false,
        message: errorMessage,
        data: null,
      });
    }
    const isValidEmail = (email) => validator.isEmail(email);
    if (!isValidEmail(email)) {
      return res.status(200).json({
        success: false,
        message: "Email is invalid!",
        data: null,
      });
    }

    try {
      const reponse = await userService.signIn({
        email,
        password,
      });
      return res.status(200).json({
        success: reponse.success,
        message: reponse.message,
        data: reponse.data,
      });
    } catch (error) {
      next(error);
    }
  },

  signOut: async (req, res, next) => {
    const { userId, sessionId } = req.user;

    try {
      const response = await userService.signOut({
        userId,
        sessionId,
      });
      return res.status(200).json({
        success: response.success,
        message: response.message,
        data: response.data,
      });
    } catch (error) {
      next(error);
    }
  },

  viewUser: async (req, res, next) => {
    const { userId } = req.user;

    try {
      const user = await userService.viewUser({ userId });

      return res.status(200).json({
        success: user.success,
        message: user.message,
        data: user.data,
      });
    } catch (error) {
      next(error);
    }
  },

  addNewUser: async (req, res, next) => {
    const { userName, firstName, lastName, email, password, role } = req.body;

    const { userId } = req.user;

    try {
      const response = await userService.addNewUser({
        userName,
        firstName,
        lastName,
        email,
        password,
        role,
        userId,
      });
      return res.status(200).json({
        success: response.success,
        message: response.message,
        data: response.data,
      });
    } catch (error) {
      next(error);
    }
  },
};

export default UserCtrl;
