import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import style from "./EmployeAttendanceRegularized.module.css";
function EmployeAttendanceRegularized() {
  const [getRegularizedAttendence, setRegularizedAttendence] = useState([]);

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

  return (
    <div className={style.container}>
      <h1>Regularized Attendance Sent By Employe</h1>
      <div className={style.result}>
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
      </div>
    </div>
  );
}

export default EmployeAttendanceRegularized;
