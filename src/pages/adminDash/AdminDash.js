import React from "react";
import { useNavigate } from "react-router-dom";
import style from "./AdminDash.module.css";
import { ImProfile } from "react-icons/im";
import { BiEdit } from "react-icons/bi";
import { TbReportMoney } from "react-icons/tb";
import { FcCheckmark } from "react-icons/fc";
import { BiLogOut } from "react-icons/bi";
import { BsFileEarmarkExcel } from "react-icons/bs";
import { AiOutlineInteraction } from "react-icons/ai";
import logo from "./vibrant.jpg"
function AdminDash() {
  const navigate = useNavigate();
  const handleRedirect = () => {
    navigate("/allEmploye");
  };

  const handleRedirect1 = () => {
    navigate("/hrView");
  };

  const handleRedirect2 = () => {
    navigate("/getRegularizedHr");
  };

  const handleRedirect3 = () => {
    navigate("/hrViewEmployeSalary");
  };

  const handleRedirect4 = () => {
    navigate("/adminViewHrSalary");
  };
  const handleRedirect5 = () => {
    navigate("/employeAttendenceRegularized");
  };
  const handleRedirect6 = () => {
    navigate("/adminLogin");
  };
  return (
    <div className={style.container}>
      <div className={style.navbar}>
        <h1>
          <img src="" />
        </h1>
        <ul>
          <li>
            <button className={style.button} onClick={handleRedirect}>
              <span className={style.icon}>
                <AiOutlineInteraction className={style.icons} />
              </span>
              <span className={style.title}>Actions</span>
            </button>
          </li>
          <li>
            <button className={style.button} onClick={handleRedirect1}>
              <span className={style.icon}>
                <AiOutlineInteraction className={style.icons} />
              </span>
              <span className={style.title}>Hr Actions</span>
            </button>
          </li>
          <li>
            <button className={style.button} onClick={handleRedirect2}>
              <span className={style.icon}>
                <FcCheckmark className={style.icons} />
              </span>
              <span className={style.title}>Regularized Hr Attendance</span>
            </button>
          </li>
          <li>
            <button className={style.button} onClick={handleRedirect3}>
              <span className={style.icon}>
                <TbReportMoney className={style.icons} />
              </span>
              <span className={style.title}>Salary of Employee</span>
            </button>
          </li>
          <li>
            <button className={style.button} onClick={handleRedirect4}>
              <span className={style.icon}>
                <TbReportMoney className={style.icons} />
              </span>
              <span className={style.title}>Salary of Hr</span>
            </button>
          </li>
          <li>
            <button className={style.button} onClick={handleRedirect5}>
              <span className={style.icon}>
                <FcCheckmark className={style.icons} />
              </span>
              <span className={style.title}>Employe Attendance</span>
            </button>
          </li>
          <li>
            <button className={style.button} onClick={handleRedirect6}>
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
        <div>
          <h1 className={style.h1}>WELCOME ADMIN</h1>
        </div>
      </div>
    </div>
  );
}

export default AdminDash;
