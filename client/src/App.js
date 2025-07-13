import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home.js";
import Login from "./pages/login/Login.js";
import UserRegister from "./pages/register/UserRegister.js";
import TaskList from "./pages/TasktLists/TaskList.js";
import PrivateRoutes from "./component/privateRoutes/PrivateRoutes.js";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<UserRegister />} />

        <Route path="/" element={<Home />} />

        <Route element={<PrivateRoutes />}>
          <Route path="/task" element={<TaskList />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
