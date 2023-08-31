import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Select from "react-select";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import style from "./GetHrSalaryAdmin.module.css";

function GetHrSalaryAdmin() {
  const { id } = useParams();
  const [getAttendanceHrById, setGetAttendenceHrById] = useState([]);
  const [filteredMonth, setFilteredMonth] = useState(getAttendanceHrById);

  const [selectedOption, setSelectedOption] = useState(null);
  const [salarys, setSalary] = useState("");
  const [getSalary, setGetSalary] = useState([]);
  const [currentMonthSalary, setCurrentMonthSalary] = useState("");
  const [daysWorked, setDaysWorked] = useState("");
  const [currentMonthLabels, setCurrentMonthLabel] = useState({});
  const [salaryEmploye, setSalaryEmploye] = useState([]);

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
      .get("http://localhost:5000/getAttendanceHr")
      .then((result) => {
        // console.log(result.data, "perticular");
        const data = result.data;
        if (data) {
          const getAttendanceByIds = data.filter((item) => item.hrId === id);
          setGetAttendenceHrById(getAttendanceByIds);

          setFilteredMonth(getAttendanceByIds);
        }
        setGetSalary(result.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [id]);

  const handlefiterMonth = () => {
    if (!selectedOption) {
      setFilteredMonth(getAttendanceHrById);
      return;
    }

    const filterMonth = getAttendanceHrById.filter(
      (item) =>
        item.todayDate.substring(5, 7) === selectedOption.value &&
        item.hrId === id
    );

    const salary = filterMonth.length * 500;
    setSalary(salary);

    setFilteredMonth(filterMonth);
  };

  const calculateSalary = () => {
    let currentMonth = new Date().toISOString().split("T")[0];
    // let currentMonth = "2023-09-08";
    currentMonth = currentMonth.substring(5, 7);
    // console.log(getSalary, "bbbbbbbb");
    const filterSalary = getSalary.filter(
      (item) =>
        item.todayDate.substring(5, 7) === currentMonth && item.hrId === id
    );

    const daysWorked = filterSalary.length;
    const salary = daysWorked * 500;

    const currentMonthLabel = options.filter(
      (item) => item.value === currentMonth
    );
    // console.log(currentMonthLabel, 95);
    setCurrentMonthLabel(currentMonthLabel);
    const salaryData = {
      id,
      daysWorked,
      salary,
    };
    setSalaryEmploye(salaryData);

    setDaysWorked(daysWorked);
    setCurrentMonthSalary(salary);
  };

  useEffect(() => {
    calculateSalary();
  }, [getSalary]);

  const generateExcel = () => {
    const userData = [];
    userData.push(salaryEmploye);
    // console.log(salaryEmploye,112);

    console.log(userData, 115);

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("UserData");

    // Adding headers
    const headerRow = worksheet.addRow([
      "User Name",
      "Salary",
      "Attended Days",
    ]);
    headerRow.font = { bold: true };

    // Adding data with styles
    userData.forEach((user) => {
      const row = worksheet.addRow([user.id, user.salary, user.daysWorked]);
      row.eachCell((cell) => {
        cell.alignment = { vertical: "middle", horizontal: "center" };
        cell.border = { top: { style: "thin" }, bottom: { style: "thin" } };
      });
    });

    // Set column widths
    worksheet.columns.forEach((column) => {
      column.width = 15;
    });

    // Generate Excel file
    const excelBlob = workbook.xlsx.writeBuffer().then((buffer) => {
      const blob = new Blob([buffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      saveAs(blob, "user_data.xlsx");
    });
  };

  return (
    <div className={style.container}>
      <div className={style.innerDiv}>
        <div className={style.firstSection}>
          <h1>Can see Hr Salary By Months</h1>
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
          {getAttendanceHrById.length > 0 ? (
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
                {filteredMonth.map((item) => (
                  <tr key={item._id}>
                    <td>{item.todayDate}</td>
                    <td>{item.hrHridId}</td>
                    <td>{item._id}</td>
                    <td>{item.placeOfWorkValue}</td>
                    <td>{item.placeOfWorkFullForm}</td>
                    <td>{item.hrId}</td>
                    <td>{item.hrName}</td>
                    <td>{item.hrLastName}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No Data Found</p>
          )}

          {/* <div>
        Your Monthly Salary counted by attendance
        <p>
          {salarys ? <p>Your Salary for this Months is {salarys}</p> : <p></p>}
        </p>
      </div> */}

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

        {/* <div>
        Your current Month Salary counted by attendance
        <p>
          {daysWorked ? (
            <p>Your worked this much {daysWorked} days in this month</p>
          ) : (
            <p></p>
          )}
          {currentMonthSalary ? (
            <p>Your Salary for this Months is {currentMonthSalary}</p>
          ) : (
            <p></p>
          )}
        </p> */}
        <div className={style.excelBtn}>
          <button className={style.excel} onClick={generateExcel}>
            Export to Excel
          </button>
        </div>
      </div>
    </div>
  );
}

export default GetHrSalaryAdmin;
