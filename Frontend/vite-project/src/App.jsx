import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/home.jsx";
import Login from "./components/auth/Login.jsx";
import Signup from "./components/auth/Signup.jsx";
import "./index.css";
import Jobs from "./components/Jobs.jsx";
import Browse from "./components/browse.jsx";
export default function App() {
  return (
    <>
      <Router>
        <div>
          <Routes>
            <Route exact path="/" element={<Home />}></Route>
            <Route exact path="/login" element={<Login />}></Route>
            <Route exact path="/signup" element={<Signup />}></Route>
            <Route exact path="/jobs" element={<Jobs />}></Route>
            <Route exact path="/browse" element={<Browse />}></Route>
          </Routes>
        </div>
      </Router>
    </>
  );
}
