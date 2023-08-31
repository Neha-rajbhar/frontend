import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import style from "./AdminLogin.module.css";
import Home from "../form/Home/Home";

function AdminLogin() {
  const [adminId, setAdminId] = useState("");
  const [password, setPassword] = useState("");
  const [allHr, setAllHr] = useState([]);
  const navigate = useNavigate();

  // const fetchData = async () => {
  //   let response = await axios.get("http://localhost:5000/getHr");
  //   setAllHr(response.data);
  // };

  // useEffect(() => {
  //   fetchData();
  // }, []);

  // console.log(allHr, "hr");
  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      adminId.toLowerCase() === "admin" &&
      password.toLowerCase() === "admin"
    ) {
      alert("Login sucess");
      navigate("/adminDash");
    } else {
      alert("credential not match try again");
    }
  };
  //   if (adminId && password) {
  //     const hr = allHr.filter(
  //       (item) => item.hrId === adminId && item.password === password
  //     );
  //     if (hr.length > 0) {
  //       localStorage.setItem("hrLoginCurrentUser", JSON.stringify(hr));
  //       alert("login sucess");
  //       navigate("/hrDashboard");
  //     }
  //   }
  // };

  return (
    <div className={style.main}>
      <div className={style.home}>
        <Home />
      </div>

      <div className={style.formDiv}>
        <h1>Admin Login Form</h1>

        <form className={style.form}>
          <label>Enter AdminId</label>
          <input
            type="text"
            placeholder="Enter AdminId"
            required
            value={adminId}
            onChange={(e) => setAdminId(e.target.value)}
          />
          <label>Enter Password</label>
          <input
            type="password"
            placeholder="Enter Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleSubmit}>Login</button>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;
