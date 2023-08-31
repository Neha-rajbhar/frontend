import "./App.css";
import React from "react";

import Dashboard from "./pages/dashboard/Dashboard";
import EmployeeForm from "./pages/form/EmployeeForm";
import Login from "./pages/login/Login";
import { Routes, Route } from "react-router-dom";
import Profile from "./pages/profile/Profile";
import Attendence from "./pages/attendence/Attendence";
import Salary from "./pages/salary/Salary";
import Excel from "./pages/excel/Excel";
import GetAttendence from "./pages/attendence/getAttendence/GetAttendence";
import AdminLogin from "./pages/adminLogin/AdminLogin";
import AllEmployeData from "./pages/allEmployeData/AllEmployeData";
import AdminDash from "./pages/adminDash/AdminDash";
import RegularizedAttendence from "./pages/attendence/regularizedAttendence/RegularizedAttendence";
import HrDashboard from "./pages/hr/hrDashboard/HrDashboard";
import HrProfile from "./pages/hr/hrProfile/HrProfile";
import UpdateEmploye from "./pages/allEmployeData/updateEmploye/UpdateEmploye";
import HrViewEmploye from "./pages/hr/hrActions/hrViewEmploye/HrViewEmploye";
import UpdateProfile from "./pages/profile/updateProfile/UpdateProfile";
import ChangePassword from "./pages/profile/changePassword/ChangePassword";
import HrView from "./pages/hrActions/hrView/HrView";
import HrCreate from "./pages/hrActions/hrCreate/HrCreate";
import HrUpdate from "./pages/hrActions/hrUpdate/HrUpdate";
import HrUpdateProfile from "./pages/hr/hrProfile/HrUpdateProfile";
import HrAttendance from "./pages/hr/hrAttendance/HrAttendance";
import HrSalary from "./pages/hr/hrSalary/HrSalary";
import HrRegularizedAttendance from "./pages/hr/hrAttendance/hrRegularizedAttendance/HrRegularizedAttendance";
import HrAttendanceById from "./pages/hr/hrGetAttendanceHrById/HrAttendanceById";
import HrRegularized from "./pages/adminDash/getRegularizedAttendanceHr/HrRegularized";
import HrChangePassword from "./pages/hr/hrProfile/hrChangePass/HrChangePassword";
import HrGetEmployeSalary from "./pages/hr/hrGetEmployeSalary/HrGetEmployeSalary";
import GetSalaryEmploye from "./pages/hr/hrGetEmployeSalary/getSalaryEmploye/GetSalaryEmploye";
import GetHrSalaryView from "./pages/adminDash/getHrSalary/GetHrSalaryView";
import GetHrSalaryAdmin from "./pages/adminDash/getHrSalary/getHrSalaryAdmin/GetHrSalaryAdmin";
import EmployeAttendanceRegularized from "./pages/hr/hrDashboard/employeRegularizedAttendence/EmployeAttendanceRegularized";
import HrLogin from "./pages/adminLogin/hrLogin/HrLogin";
import Home from "./pages/form/Home/Home";
import FetchExcelData from "./pages/excel/fetchExcel/FetchExcelData";
function App() {
  return (
    <div className="App">
      {/* <EmployeeForm />
      <Login/> */}
      <Routes>
        {/* <Route exact path="/" element={<Home />} /> */}
        <Route exact path="/form" element={<EmployeeForm />} />
        <Route path="/" element={<Login />} />
        <Route path="/hrLogin" element={<HrLogin />} />
        <Route path="/fetchExcelData" element={<FetchExcelData />} />
        <Route path="/dash" element={<Dashboard />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/attendence" element={<Attendence />} />
        <Route path="/salary/:employeId" element={<Salary />} />
        <Route path="/excel" element={<Excel />} />
        <Route path="/getAttendence/:employeId" element={<GetAttendence />} />
        <Route path="/getRegularizedHr" element={<HrRegularized />} />

        <Route
          path="/getAttendanceHrById/:hrId"
          element={<HrAttendanceById />}
        />
        <Route path="/update/:id" element={<UpdateEmploye />} />
        <Route path="/updateHr/:id" element={<HrUpdate />} />
        <Route
          path="/hrRegularizedAttendence/:id"
          element={<HrRegularizedAttendance />}
        />

        <Route path="/changePassword/:id" element={<ChangePassword />} />
        <Route path="/updateProfile/:id" element={<UpdateProfile />} />
        <Route path="/updateHrProfile/:id" element={<HrUpdateProfile />} />
        <Route path="/adminLogin" element={<AdminLogin />} />
        <Route path="/allEmploye" element={<AllEmployeData />} />
        <Route path="/adminDash" element={<AdminDash />} />
        <Route
          path="/regularizeAttendence"
          element={<RegularizedAttendence />}
        />
        <Route path="/hrDashboard" element={<HrDashboard />} />
        <Route path="/hrProfile/:id" element={<HrProfile />} />
        <Route path="/hrAttendance/:id" element={<HrAttendance />} />
        <Route path="/hrSalary/:id" element={<HrSalary />} />
        <Route path="/hrChangePassword/:id" element={<HrChangePassword />} />
        <Route
          path="/getEmployeSalary/:employeId"
          element={<GetSalaryEmploye />}
        />
        <Route
          path="/employeAttendenceRegularized"
          element={<EmployeAttendanceRegularized />}
        />
        <Route
          path="/hrRegularizedAttendence/:id"
          element={<HrRegularizedAttendance />}
        />
        <Route path="/hrViewEmploye" element={<HrViewEmploye />} />
        <Route path="/getHrSalaryAdmin/:id" element={<GetHrSalaryAdmin />} />

        <Route path="/hrViewEmployeSalary" element={<HrGetEmployeSalary />} />
        <Route path="/adminViewHrSalary" element={<GetHrSalaryView />} />

        <Route path="/hrView" element={<HrView />} />
        <Route path="/hrCreate" element={<HrCreate />} />
      </Routes>
    </div>
  );
}

export default App;
