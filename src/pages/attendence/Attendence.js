import React, { useEffect, useState } from "react";
import Select from "react-select";
import axios from "axios";
import GetAttendence from "./getAttendence/GetAttendence";
import { NavLink } from "react-router-dom";
import RegularizedAttendence from "./regularizedAttendence/RegularizedAttendence";
import style from "./Attendence.module.css";

function Attendence() {
  const [currentDate, setCurrentDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [employe, setEmploye] = useState(
    JSON.parse(localStorage.getItem("login")) || {}
  );
  const [selectedOption, setSelectedOption] = useState(null);
  const [attendence, setAttendence] = useState([]);
  const [checkAttendence, setCheckAttendence] = useState([]);
  const [show, setShow] = useState(false);
  const [msg, setMsg] = useState("");
  const [sucess, setSucess] = useState("");
  const options = [
    { value: "wfh", label: "Work From Home" },
    { value: "wfo", label: "Work From Office" },
    { value: "wfcs", label: "Work From Client Side" },
  ];

  const fetchAttendence = async () => {
    const response = await axios.get("http://localhost:5000/getAttendence");
    setCheckAttendence(response.data);

    // console.log(response.data, "hgfyergfndyutrhb");
  };

  useEffect(() => {
    fetchAttendence();
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();

    const submitted = checkAttendence.filter(
      (item) =>
        item.todayDate === currentDate && item.employeId === employe[0]._id
    );
    console.log(submitted, "submitted");

    if (submitted.length > 0) {
      // alert("You have already submitted attendance for today.");
      setMsg("You have already submitted attendance for today.");
      return;
    }

    const newAtt = [
      ...attendence,
      {
        todayDate: currentDate,
        placeOfWorkValue: selectedOption.value,
        placeOfWorkFullForm: selectedOption.label,
        employeId: employe[0]._id,
        employeUserId: employe[0].userId,
        employeName: employe[0].firstName + " " + employe[0].lastName,
      },
    ];

    const newAttendence = {
      todayDate: currentDate,
      placeOfWorkValue: selectedOption.value,
      placeOfWorkFullForm: selectedOption.label,
      employeId: employe[0]._id,
      employeUserId: employe[0].userId,
      employeName: employe[0].firstName,
      employeLastName: employe[0].lastName,
    };

    setAttendence(newAtt);
    localStorage.setItem("attendence", JSON.stringify(newAtt));

    try {
      // console.log(newAttendence, "backend");
      const response = await axios.post(
        "http://localhost:5000/attendence",
        newAttendence
      );
      // console.log(response.data.message);
      if (response.data.status == false) {
        alert(response.data.message);
      } else {
        // alert("Attendence Marked");
        setSucess("Attendance Marked");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const hanleShow = () => {
    setShow(!show);
  };

  return (
    <div className={style.main}>
      <p style={{ color: "red", fontSize: "20px" }}>{msg && msg}</p>
      <p style={{ color: "red", fontSize: "20px" }}>{sucess && sucess}</p>
      <div className={style.innerDiv}>
        <div className={style.formDiv}>
          <form className={style.form}>
            <h1>Mark Todays Attendance</h1>
            <label>Todays date</label>
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

          {employe.map((item) => {
            return (
              <>
                <div className={style.nav}>
                  <NavLink
                    className={style.redirect}
                    to={`/getAttendence/${item._id}`}
                  >
                    Get Attendance List
                  </NavLink>
                </div>
              </>
            );
          })}
        </div>
        <div className={style.secondSection}>
          <button
            className={show ? style.hide : style.showBtn}
            onClick={hanleShow}
          >
            {show
              ? "Hide Regularized Attendance Form "
              : "Show Regularized Attendance Form"}
          </button>
          {show ? <RegularizedAttendence /> : ""}
        </div>
      </div>
    </div>
  );
}

export default Attendence;
