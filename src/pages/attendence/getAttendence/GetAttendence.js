import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Select from "react-select";
import { useRecoilState } from "recoil";
import { getAttendenceByIds } from "../../../recoil/atom";
import style from "./GetAttendence.module.css";

function GetAttendence() {
  const { employeId } = useParams();

  const [attendance, setAttendence] = useState([]);

  const [getAttendenceById, setGetAttendenceById] = useState([]);
  const [recoilAttendence, setRecoilAttendence] =
    useRecoilState(getAttendenceByIds);
  const [filterMonth, setFilteredMonth] = useState(getAttendenceById);
  const navigate = useNavigate();

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

  const fetchAttendence = async () => {
    const response = await axios.get("http://localhost:5000/getAttendence");
    setAttendence(response.data);

    // console.log(response.data, "hgfyergfndyutrhb");
  };

  const handleRedirect = () => {
    navigate("/dash");
  };
  // console.log("employe", employeId);
  useEffect(() => {
    axios
      .get(`http://localhost:5000/getAttendenceById/${employeId}`)
      .then((result) => {
        // console.log(result.data, "perticular");
        const data = result.data;
        if (data) {
          setGetAttendenceById(data);
          setRecoilAttendence(data);
          setFilteredMonth(data);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [employeId]);

  const handlefiterMonth = (e) => {
    e.preventDefault();

    if (!selectedOption) {
      setFilteredMonth(getAttendenceById);
      return;
    }

    const filterMonths = attendance.filter(
      (item) =>
        item.todayDate?.substring(5, 7) === selectedOption.value &&
        item.employeId === employeId
    );
    setFilteredMonth(filterMonths);
  };

  useEffect(() => {
    fetchAttendence();
  }, []);
  return (
    <div className={style.main}>
      <div className={style.innerDiv}>
        <div className={style.filterSection}>
          <h1>You can see Attendance by Month</h1>
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
          {getAttendenceById.length > 0 ? (
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

          <button onClick={handleRedirect}>Go Back To Home </button>
        </div>
      </div>
    </div>
  );
}

export default GetAttendence;
