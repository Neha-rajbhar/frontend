import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import Select from "react-select";
import style from "./HrAttendance.module.css";
function HrAttendance() {
  const { id } = useParams();

  const [currentDate, setCurrentDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  const [selectedOption, setSelectedOption] = useState(null);

  const [employe, setEmploye] = useState(
    JSON.parse(localStorage.getItem("hr")) || {}
  );

  const [currentUser, setCurrentHr] = useState([]);
  const [allAttendanceHr, setAllAttendanceHr] = useState([]);

  const fetchAttendenceHr = async () => {
    const response = await axios.get("http://localhost:5000/getAttendanceHr");

    setAllAttendanceHr(response.data);
  };

  useEffect(() => {
    fetchAttendenceHr();
  }, []);

  const fetchData = async () => {
    const response = await axios.get("http://localhost:5000/getHrById/" + id);
    setCurrentHr(response.data);
    localStorage.setItem("hr", JSON.stringify(response.data));
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  const options = [
    { value: "wfh", label: "Work From Home" },
    { value: "wfo", label: "Work From Office" },
    { value: "wfcs", label: "Work From Client Side" },
  ];

  const handleSave = async (e) => {
    e.preventDefault();

    const checkAttendence = allAttendanceHr.filter(
      (item) => item.todayDate === currentDate && item.hrId === currentUser._id
    );

    if (checkAttendence.length > 0) {
      alert("You Have already marked the attendence for today");
      return;
    }

    const newAttendence = {
      todayDate: currentDate,
      placeOfWorkValue: selectedOption.value,
      placeOfWorkFullForm: selectedOption.label,
      hrId: currentUser._id,
      hrHridId: currentUser.hrId,
      hrName: currentUser.firstName,
      hrLastName: currentUser.lastName,
    };

    try {
      const response = await axios.post(
        "http://localhost:5000/attendanceByHr",
        newAttendence
      );

      if (response.data.status === false) {
        alert(response.data.message);
      } else {
        alert(`Attendance Marked for ${currentDate}`);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={style.container}>
      <div className={style.innerDiv}>
        <h1>Mark Attendance for {currentDate}</h1>
        <form className={style.form}>
          <label>
            Todays date <p>You Cannot change Date</p>
          </label>
          <input type="text" value={currentDate} readOnly />

          <label>Select an option</label>
          <Select
            className={style.select}
            options={options}
            value={selectedOption}
            onChange={setSelectedOption}
          />

          <button onClick={handleSave}>submit</button>
        </form>

        <NavLink
          className={style.redirect}
          to={`/getAttendanceHrById/${employe._id}`}
        >
          Get Attendance List
        </NavLink>
      </div>
    </div>
  );
}

export default HrAttendance;
