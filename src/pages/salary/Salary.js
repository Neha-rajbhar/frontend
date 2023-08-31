import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getAttendenceByIds } from "../../recoil/atom";
import Select from "react-select";
import style from "./Salary.module.css";

function Salary() {
  const { employeId } = useParams();

  const [attendanceById, setGetAttendenceById] = useState([]);

  const [filterMonth, setFilteredMonth] = useState(attendanceById);
  const navigate = useNavigate();

  const [selectedOption, setSelectedOption] = useState(null);
  const [salarys, setSalary] = useState("");
  const [getSalary, setGetSalary] = useState([]);
  const [currentMonthSalary, setCurrentMonthSalary] = useState("");
  const [daysWorked, setDaysWorked] = useState("");
  const [currentMonthLabels, setCurrentMonthLabel] = useState({});

  const options = [
    { value: "01", label: "Jan" },
    { value: "02", label: "feb" },
    { value: "03", label: "march" },
    { value: "04", label: "April" },

    { value: "05", label: "May" },

    { value: "06", label: "June" },

    { value: "07", label: "July" },

    { value: "08", label: "August" },
    { value: "09", label: "September" },
    { value: "10", label: "October" },
    { value: "11", label: "November" },
    { value: "12", label: "December" },
  ];

  useEffect(() => {
    axios
      .get(`http://localhost:5000/getAttendenceById/${employeId}`)
      .then((result) => {
        // console.log(result.data, "perticular");
        const data = result.data;

        if (data) {
          setGetAttendenceById(data);
          // setRecoilAttendence(data);
          setFilteredMonth(data);
        }
        setGetSalary(result.data);
      })

      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [employeId]);

  const handlefiterMonth = (e) => {
    e.preventDefault();

    if (!selectedOption) {
      setFilteredMonth(attendanceById);
      return;
    }

    const filterMonths = attendanceById.filter(
      (item) =>
        item.todayDate?.substring(5, 7) === selectedOption.value &&
        item.employeId === employeId
    );
    console.log(filterMonths.length);

    const salary = filterMonths.length * 500;
    setSalary(salary);
    setFilteredMonth(filterMonths);
  };

  const calculateSalary = () => {
    let currentMonth = new Date().toISOString().split("T")[0];
    // let currentMonth = "2023-09-08";
    currentMonth = currentMonth.substring(5, 7);
    // console.log(getSalary, "bbbbbbbb");
    const filterSalary = getSalary.filter(
      (item) =>
        item.todayDate?.substring(5, 7) === currentMonth &&
        item.employeId === employeId
    );

    const daysWorked = filterSalary.length;
    const salary = daysWorked * 500;
    const currentMonthLabel = options.filter(
      (item) => item.value === currentMonth
    );
    // console.log(currentMonthLabel, 95);
    setCurrentMonthLabel(currentMonthLabel);
    // console.log(`Employee ${employeId} worked ${daysWorked} days this month.`);
    // console.log(`Salary for the current month: ${salary}`);
    setDaysWorked(daysWorked);
    setCurrentMonthSalary(salary);
  };

  useEffect(() => {
    calculateSalary();
  }, [getSalary]);

  // console.log(currentMonthLabels[0].label, 111);
  return (
    <div className={style.main}>
      <div className={style.innerDiv}>
        <div className={style.filterSection}>
          <h1>You can see Salary By Months</h1>
          <label>Select an option</label>
          <Select
            className={style.select}
            options={options}
            value={selectedOption}
            onChange={setSelectedOption}
          />

          <button onClick={handlefiterMonth}>submit</button>
        </div>
        <div className={style.result}>
          {attendanceById.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <th>Date Of Attendance</th>
                  <th>Employee User ID</th>
                  <th>Attendance ID</th>
                  <th>Place of Work Value</th>
                  <th>Place of Work Full Form</th>
                  <th>Employe Id</th>
                  <th>Employe firstName</th>
                  <th>Employe LasttName</th>
                </tr>
              </thead>
              <tbody>
                {filterMonth.map((item) => (
                  <tr key={item._id}>
                    <td>{item.todayDate}</td>
                    <td>{item.employeUserId}</td>
                    <td>{item._id}</td>
                    <td>{item.placeOfWorkValue}</td>
                    <td>{item.placeOfWorkFullForm}</td>
                    <td>{item.employeId}</td>
                    <td>{item.employeName}</td>
                    <td>{item.employeLastName}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No Data Found</p>
          )}

          <div className={style.filterSalary}>
            <p>
              {salarys ? (
                <div>
                  <p>Your Monthly Salary counted by attendance</p>
                  <p>
                    Your Salary for {selectedOption.label} Months is {salarys}
                  </p>
                </div>
              ) : (
                <p></p>
              )}
            </p>
          </div>
        </div>
        <div className={style.current}>
          Your current Month Salary counted by attendance
          <p>
            {daysWorked ? (
              <p>
                Your worked {daysWorked} days in {currentMonthLabels[0].label}{" "}
                month
              </p>
            ) : (
              <p></p>
            )}
            {currentMonthSalary ? (
              <p>
                Your Salary for {currentMonthLabels[0].label} Month is{" "}
                {currentMonthSalary}
              </p>
            ) : (
              <p></p>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Salary;
