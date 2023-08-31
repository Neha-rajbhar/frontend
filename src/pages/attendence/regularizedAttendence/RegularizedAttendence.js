import React, { useState } from "react";
import Select from "react-select";
import axios from "axios";
import style from "./RegularizedAttendence.module.css";
import { NavLink } from "react-router-dom";

function RegularizedAttendence() {
  const [currentDate, setCurrentDate] = useState("");
  const [employe, setEmploye] = useState(
    JSON.parse(localStorage.getItem("login")) || {}
  );
  const [selectedOption, setSelectedOption] = useState(null);
  const [reason, setReason] = useState("");
  const [attendence, setAttendence] = useState([]);
const [msg,setMsg]=useState("")
  const options = [
    { value: "wfh", label: "Work From Home" },
    { value: "wfo", label: "Work From Office" },
    { value: "wfcs", label: "Work From Client Side" },
  ];
  const handleSave = async (e) => {
    e.preventDefault();

    // console.log("Selected Date:", currentDate);
    // console.log("Selected Option:", selectedOption);

    const newAtt = [
      ...attendence,
      {
        todayDate: currentDate,
        placeOfWorkValue: selectedOption.value,
        placeOfWorkFullForm: selectedOption.label,
        employeId: employe[0]._id,
        employeUserId: employe[0].userId,
        employeName: employe[0].firstName + " " + employe[0].lastName,
        reason: reason,
      },
    ];

    const newAttendence = {
      RegularizedAttendenceDate: currentDate,
      placeOfWorkValue: selectedOption.value,
      placeOfWorkFullForm: selectedOption.label,
      employeId: employe[0]._id,
      employeUserId: employe[0].userId,
      employeName: employe[0].firstName,
      employeLastName: employe[0].lastName,
      reason: reason,
    };

    setAttendence(newAtt);
    localStorage.setItem("regularizedAttendence", JSON.stringify(newAtt));

    try {
      //   console.log(newAttendence, "backend");
      const response = await axios.post(
        "http://localhost:5000/regularizedAttendence",
        newAttendence
      );
      //   console.log(response.data.message);
      if (response.data.status == false) {
        alert(response.data.message);
      } else {
        // alert("Request Sent");
        setMsg("Request Sent")
      }
    } catch (err) {
      console.log(err);
    }
    setReason("")
    setSelectedOption("")
    setCurrentDate("")
  };

  return (
    <div className={style.main}>
      <p style={{color:"green", fontSize:"20px"}}>{msg && msg}</p>
      <div className={style.innerDiv}>
        <div className={style.formDiv}>
          <form className={style.form}>
            <label>Choose The Date You Want To Regularized Attendance</label>
            <input
              type="date"
              value={currentDate}
              onChange={(e) => setCurrentDate(e.target.value)}
            />

            <label>Select an option</label>
            <Select
              className={style.select}
              options={options}
              value={selectedOption}
              onChange={setSelectedOption}
            />
            <label>Enter The Reason</label>
            <input
              type="text"
              placeholder="Enter the Reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            />
            <button onClick={handleSave}>submit</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RegularizedAttendence;
