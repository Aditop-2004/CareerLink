import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home.jsx";
import Login from "./components/auth/Login.jsx";
import Signup from "./components/auth/Signup.jsx";
import "./index.css";
import Jobs from "./components/Jobs.jsx";
import Browse from "./components/Browse.jsx";
import Profile from "./components/Profile.jsx";
import JobDescription from "./components/JobDescription.jsx";
import Companies from "./components/admin/Companies.jsx";
import CompaniesCreate from "./components/admin/CompaniesCreate.jsx";
import CompanySetup from "./components/admin/CompanySetup.jsx";
import AdminJobs from "./components/admin/AdminJobs.jsx";
import JobSetup from "./components/admin/JobSetup.jsx";
import JobsCreate from "./components/admin/JobsCreate.jsx";
import JobApplicants from "./components/admin/JobApplicants.jsx";
import ResumeAnalysisPage from "./components/ResumeAnalysisPage.jsx";
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
            <Route exact path="/profile" element={<Profile />}></Route>
            <Route
              exact
              path="/admin/companies"
              element={<Companies />}
            ></Route>
            <Route
              exact
              path="/description/:id"
              element={<JobDescription />}
            ></Route>
            <Route
              exact
              path="/admin/companies/create"
              element={<CompaniesCreate />}
            ></Route>
            <Route exact path="/browse" element={<Browse />}></Route>
            <Route
              exact
              path="/admin/companies/:id"
              element={<CompanySetup />}
            ></Route>
            <Route exact path="/admin/jobs" element={<AdminJobs />}></Route>
            <Route exact path="/admin/job/:id" element={<JobSetup />}></Route>
            <Route
              exact
              path="/admin/jobs/create"
              element={<JobsCreate />}
            ></Route>
            <Route
              exact
              path="/admin/jobs/applicants/:id"
              element={<JobApplicants />}
            ></Route>
            <Route
              exact
              path="/ResumeAnalysis"
              element={<ResumeAnalysisPage />}
            ></Route>
          </Routes>
        </div>
      </Router>
    </>
  );
}
