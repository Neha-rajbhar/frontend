import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import style from "./HrLogin.module.css";
import Home from "../../form/Home/Home";

function HrLogin() {
  const [adminId, setAdminId] = useState("");
  const [password, setPassword] = useState("");
  const [allHr, setAllHr] = useState([]);
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const fetchData = async () => {
    let response = await axios.get("http://localhost:5000/getHr");
    setAllHr(response.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  //   console.log(allHr, "hr");
  const handleSubmit = (e) => {
    e.preventDefault();

    if (adminId && password) {
      const hr = allHr.filter(
        (item) => item.hrId === adminId.toUpperCase() && item.password === password.toUpperCase()
      );
      if (hr.length > 0) {
        localStorage.setItem("hrLoginCurrentUser", JSON.stringify(hr));
        alert("login sucess");
        navigate("/hrDashboard");
        // setMsg("Login Sucess");
      }
    }
  };

  return (
    <div className={style.main}>
      <div className={style.home}>
        <Home />
      </div>

      {msg && msg}
      <div className={style.formDiv}>
        <h1>Hr Login Form</h1>
        <form className={style.form}>
          <label>Enter Hrid</label>
          <input
            type="text"
            placeholder="Enter HRId"
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
export default HrLogin;
