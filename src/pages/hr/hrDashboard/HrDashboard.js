import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { ImProfile } from "react-icons/im";
import { BiEdit } from "react-icons/bi";
import { TbReportMoney } from "react-icons/tb";
import { FcCheckmark } from "react-icons/fc";
import { BiLogOut } from "react-icons/bi";
import { BsFileEarmarkExcel } from "react-icons/bs";
import style from "./HrDashboard.module.css";
import logo from "../../form/Home/vibrant.jpg";
function HrDashboard() {
  const [getRegularizedAttendence, setRegularizedAttendence] = useState([]);

  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState([]);

  useEffect(() => {
    const loginData =
      JSON.parse(localStorage.getItem("hrLoginCurrentUser")) || [];
    setCurrentUser(loginData);
  }, []);

  const fetchRegularizedAttendence = async () => {
    const response = await axios.get(
      "http://localhost:5000/getRegularizedAttendence"
    );
    setRegularizedAttendence(response.data);
    // console.log(response.data);
  };

  useEffect(() => {
    fetchRegularizedAttendence();
  }, []);

  const handleAttendence = async (item) => {
    // console.log(item, "data marked");
    try {
      const response = await axios.post(
        `http://localhost:5000/approveRegularizedAttendence/${item._id}`
      );
      console.log(response.data);
      setRegularizedAttendence();
    } catch (err) {
      console.log(err);
    }
  };
  const handelRedirect = () => {
    navigate("/hrLogin");
  };
  return (
    <div>
      <div className={style.container}>
        <div className={style.navbar}>
          <h1>
            <img src="" />
          </h1>
          <ul>
            {currentUser.map((item) => {
              return (
                <>
                  <li>
                    <NavLink
                      className={style.a}
                      to={`/hrProfile/${encodeURIComponent(item._id)}`}
                    >
                      <span className={style.icon}>
                        <ImProfile className={style.icons} />
                      </span>
                      <span className={style.title}>Profile</span>
                    </NavLink>
                  </li>
                  <li>
                    {" "}
                    <NavLink
                      className={style.a}
                      to={`/hrAttendance/${item._id}`}
                    >
                      <span className={style.icon}>
                        <FcCheckmark className={style.icons} />
                      </span>
                      <span className={style.title}>Attendence</span>
                    </NavLink>
                  </li>
                  <li>
                    {" "}
                    <NavLink
                      className={style.a}
                      to={`/hrRegularizedAttendence/${item._id}`}
                    >
                      <span className={style.icon}>
                        <FcCheckmark className={style.icons} />
                      </span>
                      <span className={style.title}>
                        Regularized Attendence
                      </span>
                    </NavLink>
                  </li>
                  <li>
                    {" "}
                    <NavLink className={style.a} to={`/hrSalary/${item._id}`}>
                      <span className={style.icon}>
                        <TbReportMoney className={style.icons} />
                      </span>
                      <span className={style.title}>Salary</span>
                    </NavLink>
                  </li>
                  <li>
                    {" "}
                    <NavLink
                      className={style.a}
                      to={`/hrChangePassword/${item._id}`}
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
              {" "}
              <NavLink className={style.a} to="/hrViewEmploye">
                <span className={style.icon}>
                  <TbReportMoney className={style.icons} />
                </span>
                <span className={style.title}>Actions</span>
              </NavLink>
            </li>

            <li>
              {" "}
              <NavLink className={style.a} to="/hrViewEmployeSalary">
                <span className={style.icon}>
                  <TbReportMoney className={style.icons} />
                </span>
                <span className={style.title}> Salary of Employe</span>
              </NavLink>
            </li>
            <li>
              {" "}
              <NavLink className={style.a} to="/employeAttendenceRegularized">
                <span className={style.icon}>
                  <FcCheckmark className={style.icons} />
                </span>
                <span className={style.title}>Employe Attendance</span>
              </NavLink>
            </li>
            <li>
              <button className={style.button} onClick={handelRedirect}>
                <span className={style.icon}>
                  <BiLogOut className={style.icons} />
                </span>
                <span className={style.title}>Logout</span>
              </button>
            </li>
          </ul>
        </div>
        {/* <div className={style.result}>
          <h1>Regularized Attendance Sent by Employe</h1>

          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Employee User ID</th>
                <th>Employee Name</th>
                <th>Employee Last Name</th>
                <th>Place of Work</th>
                <th>Reason</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {getRegularizedAttendence?.map((item) => (
                <tr key={item._id}>
                  <td>{item.RegularizedAttendenceDate}</td>
                  <td>{item.employeUserId}</td>
                  <td>{item.employeName}</td>
                  <td>{item.employeLastName}</td>
                  <td>{item.placeOfWorkFullForm}</td>
                  <td>{item.reason}</td>
                  <td>
                    <button onClick={() => handleAttendence(item)}>
                      Approve Attendance
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>*/}

        <div className={style.secondSection}>
          <div className={style.images}>
            <img src={logo} />
          </div>
          <div>
            {currentUser.map((item) => {
              return (
                <>
                  <h1 className={style.h1}>
                    WELCOME HR {item.firstName.toUpperCase()}{" "}
                    {item.lastName.toUpperCase()}
                  </h1>
                </>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HrDashboard;
