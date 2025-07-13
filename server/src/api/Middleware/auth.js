import JWT from "jsonwebtoken";
import UserSession from "../../database/models/UserSession.js";
import User from "../../database/models/User.js";

const auth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: Token not provided",
        data: null,
      });
    }

    // Extract the token from the Authorization header
    const token = authHeader.split(" ")[1];

    JWT.verify(token, process.env.JWT_SECRET, async (err, user) => {
      if (err) {
        return res.status(401).json({
          success: false,
          message: "Unauthorized: Failed to verify token",
          data: err,
        });
      }

      // Fetch session details
      const session = await UserSession.findOne({
        _id: user.sessionId,
        isActive: true,
      });

      if (!session) {
        return res.status(401).json({
          success: false,
          message: "Unauthorized: Session expired!",
          data: null,
        });
      }

      // Check if the session has expired
      const currentTime = new Date();
      const lastActivityTime = new Date(session.lastActivityTime);
      const timeDifference = (currentTime - lastActivityTime) / (1000 * 60); // Difference in minutes
      const sessionExpirationTime = 60; // Session expiration time in minutes

      if (timeDifference > sessionExpirationTime) {
        // Remove device ID and pushId from the user
        await User.findOneAndUpdate(
          { _id: user.userId }
          
        );

        // Deactivate the session
        session.isActive = false;
        await session.save();

        return res.status(401).json({
          success: false,
          message: "Session has expired",
          data: null,
        });
      }

      // Update last activity time
      session.lastActivityTime = Date.now();
      await session.save();

      // Attach user information to the request
      req.user = {
        userId: session.userId,
        userName: session.userName,
        role: session.role,
        sessionId: user.sessionId,
      };

      next();
    });
  } catch (error) {
    console.error("Error in auth middleware:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      data: error.stack,
    });
  }
};

export default auth;
