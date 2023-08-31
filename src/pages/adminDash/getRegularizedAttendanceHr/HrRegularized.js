import axios from "axios";
import React, { useEffect, useState } from "react";
import style from "./HrRegularized.module.css";
function HrRegularized() {
  const [hrRegularizedAttendence, setHrRegularizedAttendence] = useState([]);

  const fetchRegularizedAttendenceHr = async () => {
    const response = await axios.get(
      "http://localhost:5000/getRegularizedAttendanceByHr"
    );
    setHrRegularizedAttendence(response.data);
  };

  useEffect(() => {
    fetchRegularizedAttendenceHr();
  }, []);

  const handleAttendence = async (item) => {
    try {
      const response = await axios.post(
        `http://localhost:5000/approvedRegularizedAttendanceByAdmin/${item._id}`
      );
      setHrRegularizedAttendence();
    } catch (err) {}
  };
  return (
    <div className={style.container}>
      <h1>Regularized Attendance Sent By Hr</h1>
      <div className={style.result}>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Hr ID</th>
              <th>Hr Hr ID</th>
              <th>Hr Name</th>
              <th>Hr Last Name</th>
              <th>Place of Work</th>
              <th>Reason</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {hrRegularizedAttendence?.map((item) => (
              <tr key={item._id}>
                <td>{item.RegularizedAttendenceDate}</td>
                <td>{item.hrId}</td>
                <td>{item.hrHridId}</td>
                <td>{item.hrName}</td>
                <td>{item.hrLastName}</td>
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

export default HrRegularized;
