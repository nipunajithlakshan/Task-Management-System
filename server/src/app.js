import express from "express";
import userRouter from "./api/routers/UserRouter.js";
import taskRouter from"./api/routers/taskRouter.js";
import cors from "cors";




const app = express();

app.use(cors({
  origin: "http://localhost:3000",
  credentials: true, // Allow cookies if you're using them
}));

app.use(express.json());

app.get("/", (req, res) => res.send("Server is running!"));

//routers
app.use("/user", userRouter);
app.use("/user",taskRouter);



export default  app;
