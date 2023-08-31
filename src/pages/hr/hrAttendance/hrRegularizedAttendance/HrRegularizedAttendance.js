import axios from "axios";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Select from "react-select";
import style from "./HrRegularizedAttendance.module.css";
function HrRegularizedAttendance() {
  const { id } = useParams();

  const [currentDate, setCurrentDate] = useState("");

  const [currentUser, setCurrentHr] = useState(
    JSON.parse(localStorage.getItem("hr")) || {}
  );
  const [selectedOption, setSelectedOption] = useState(null);
  const [reason, setReason] = useState("");
  const [attendence, setAttendence] = useState([]);

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
        hrId: currentUser._id,
        hrHridId: currentUser.hrId,
        hrName: currentUser.firstName,
        hrLastName: currentUser.lastName,
        reason: reason,
      },
    ];

    const newAttendence = {
      RegularizedAttendenceDate: currentDate,
      placeOfWorkValue: selectedOption.value,
      placeOfWorkFullForm: selectedOption.label,
      hrId: currentUser._id,
      hrHridId: currentUser.hrId,
      hrName: currentUser.firstName,
      hrLastName: currentUser.lastName,
      reason: reason,
    };

    setAttendence(newAtt);
    localStorage.setItem("regularizedAttendenceHr", JSON.stringify(newAtt));

    try {
      const response = await axios.post(
        "http://localhost:5000/regularizedAttendenceHr",
        newAttendence
      );

      if (response.data.status == false) {
        alert(response.data.message);
      } else {
        alert("Request Sent");
      }
      setCurrentDate("");
      setReason("");
      setSelectedOption("");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={style.main}>
      <div className={style.innerDiv}>
        <h1>Regularized Attendance Form</h1>
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

export default HrRegularizedAttendance;
