import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Select from "react-select";
import style from "./HrAttendanceById.module.css";

function HrAttendanceById() {
  const { hrId } = useParams();
  const [getAttendanceHrById, setGetAttendenceHrById] = useState([]);
  const [filteredMonth, setFilteredMonth] = useState(getAttendanceHrById);

  const [selectedOption, setSelectedOption] = useState(null);

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
      .get(`http://localhost:5000/getAttendanceHrById/${hrId}`)
      .then((result) => {
        // console.log(result.data, "perticular");
        const data = result.data;
        if (data) {
          setGetAttendenceHrById(data);

          setFilteredMonth(data);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [hrId]);

  const handlefiterMonth = () => {
    if (!selectedOption) {
      setFilteredMonth(getAttendanceHrById);
      return;
    }

    const filterMonth = getAttendanceHrById.filter(
      (item) => item.todayDate.substring(5, 7) === selectedOption.value
    );

    setFilteredMonth(filterMonth);
  };

  return (
    <div className={style.container}>
      <div className={style.innerDiv}>
        <div className={style.form}>
          <h1>You Can see Attendance By Months</h1>
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
        </div>
      </div>
    </div>
  );
}

export default HrAttendanceById;
