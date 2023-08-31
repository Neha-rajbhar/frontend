import React from "react";
import { useNavigate } from "react-router-dom";
import style from "./Home.module.css";
import logo from "./vibrant.jpg";

function Home() {
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate("/");
  };
  const handleRedirect1 = () => {
    navigate("/hrLogin");
  };
  const handleRedirect2 = () => {
    navigate("/adminLogin");
  };
  return (
    <div className={style.homes}>
      <div className={style.image}>
        <img src={logo} alt="" />
      </div>
      <div className={style.links}>
        <button className={style.buttons} onClick={handleRedirect}>
          Employe Login
        </button>
        <button className={style.buttons} onClick={handleRedirect1}>
          Hr Login
        </button>
        <button className={style.buttons} onClick={handleRedirect2}>
          Admin Login
        </button>
      </div>
    </div>
  );
}

export default Home;
