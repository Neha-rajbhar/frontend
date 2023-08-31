import React, { useEffect, useState } from "react";
import Profile from "../profile/Profile";
import { Link, NavLink, useNavigate } from "react-router-dom";
import style from "./Dashboard.module.css";
import { ImProfile } from "react-icons/im";
import { BiEdit } from "react-icons/bi";
import { TbReportMoney } from "react-icons/tb";
import { FcCheckmark } from "react-icons/fc";
import { BiLogOut } from "react-icons/bi";
import { BsFileEarmarkExcel } from "react-icons/bs";
import logo from "../form/Home/vibrant.jpg";
// import {ImProfile} from "react-icons-im";

function Dashboard() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState([]);

  useEffect(() => {
    const loginData = JSON.parse(localStorage.getItem("login")) || [];
    setCurrentUser(loginData);
  }, []);
  const handleRedirect = () => {
    navigate("/");
  };

  return (
    <div className={style.container}>
      <div className={style.navbar}>
        <ul>
          {currentUser.map((item) => {
            return (
              <>
                <li>
                  <NavLink className={style.a} to={`/profile/${item._id}`}>
                    <span className={style.icon}>
                      <ImProfile className={style.icons} />
                    </span>
                    <span className={style.title}>Profile</span>
                  </NavLink>
                </li>

                <li>
                  <NavLink className={style.a} to={`/salary/${item._id}`}>
                    <span className={style.icon}>
                      <TbReportMoney className={style.icons} />
                    </span>
                    <span className={style.title}>Salary</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className={style.a}
                    to={`/changePassword/${item._id}`}
                  >
                    <span className={style.icon}>
                      <BiEdit className={style.icons} />
                    </span>
                    <span className={style.title}> Change Password</span>
                  </NavLink>
                </li>
              </>
            );
          })}
          <li>
            <NavLink className={style.a} to="/attendence">
              <span className={style.icon}>
                <FcCheckmark className={style.icons} />
              </span>
              <span className={style.title}>Attendence</span>
            </NavLink>
          </li>
          <li>
            <NavLink className={style.a} to="/excel">
              <span className={style.icon}>
                <BsFileEarmarkExcel className={style.icons} />
              </span>
              <span className={style.title}>Excel</span>
            </NavLink>
          </li>
          <li>
            <button className={style.button} onClick={handleRedirect}>
              <span className={style.icon}>
                <BiLogOut className={style.icons} />
              </span>
              <span className={style.title}>Logout</span>
            </button>
          </li>
        </ul>
      </div>
      <div className={style.secondSection}>
        <div className={style.images}>
          <img src={logo} />
        </div>
        <div className={style.user}>
          {currentUser.map((item) => {
            return (
              <>
                <h1 className={style.h1}>
                  WELCOME {item.firstName.toUpperCase()}{" "}
                  {item.lastName.toUpperCase()}
                </h1>
              </>
            );
          })}
        </div>
        <div>
          <button className={style.buttons} onClick={handleRedirect}>
          <span className={style.icon}>
                <BiLogOut className={style.icons} />
              </span>
              <span className={style.title}>Logout</span></button>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
