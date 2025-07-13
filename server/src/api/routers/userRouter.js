import express from "express";
const router = express.Router();
import auth from "../Middleware/auth.js";
import UserCtrl from "../controllers/UserCtrl.js";

router.get("/protected-route", auth, (req, res) => {
  res.json({
    success: true,
    message: "Access granted!",
    user: req.user,
  });
});

router.post("/register", UserCtrl.registerUser);
router.post("/signin", UserCtrl.signIn);
router.post("/signout", auth, UserCtrl.signOut);
router.get("/view-user", auth, UserCtrl.viewUser);
router.post("/add-new-user", auth, UserCtrl.addNewUser);
// router.post("/remove-user",auth,UserCtrl.removeUse);

export default router;
