import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { getCurrentUser } from "../../recoil/atom";
import style from "./Login.module.css";
import Home from "../form/Home/Home";

function Login() {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [employee, setEmployee] = useState([]);
  const [single, setSingle] = useState([]);
  const [getCurrent, setCurrent] = useRecoilState(getCurrentUser);
  const navigate = useNavigate();

  const fetchData = async () => {
    let response = await axios.get("http://localhost:5000/getEmployee");
    setEmployee(response.data);
    localStorage.setItem("employeData", JSON.stringify(response.data));
  };

  useEffect(() => {
    fetchData();
    console.log("rejhf", getCurrent);
  }, []);

  useEffect(() => {
    console.log("all employee", employee);
  }, [employee]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(userId, password);

    const loginData = employee.filter(
      (item) =>
        item.userId === userId.toUpperCase() &&
        item.password === password.toUpperCase()
    );
    console.log(loginData);
    setSingle(loginData);

    localStorage.setItem("login", JSON.stringify(loginData));
    if (loginData.length > 0) {
      alert("Login Sucess");
      navigate("/dash");
    } else {
      alert("credential not match");
    }
  };

  return (
    <div className={style.main}>
      <div className={style.home}>
        <Home />
      </div>

      <div className={style.formDiv}>
        <h1>Employe Login Form</h1>
        <form className={style.form}>
          <label>Employe UserId</label>
          <input
            type="text"
            placeholder="Enter UserId"
            required
            value={userId}
            autoComplete="false"
            onChange={(e) => setUserId(e.target.value)}
          />
          <label>Employe Password</label>
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

export default Login;
