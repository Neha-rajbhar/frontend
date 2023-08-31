import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import style from "./HrViewEmploye.module.css";

function HrViewEmploye() {
  const [employe, setEmploye] = useState([]);
  const [allEmploye, setAllEmploye] = useState([]);
  const navigate = useNavigate();

  const fetchData = async () => {
    let response = await axios.get("http://localhost:5000/getEmployee");
    setAllEmploye(response.data);
    localStorage.setItem("employeData", JSON.stringify(response.data));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleRedirect = () => {
    navigate("/form");
  };

  return (
    <div className={style.container}>
      <div className={style.innerDiv}>
        <button className={style.add} onClick={handleRedirect}>
          Add Employee
        </button>
        <div className={style.result}>
          {allEmploye.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <th>User ID</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Date of Birth</th>
                  <th>Personal Phone</th>
                  <th>Alternate Phone</th>
                  <th>Email</th>
                  <th>Company Email</th>
                  <th>Highest Qualification</th>
                  <th>Adhar Card</th>
                  <th>Pan Card</th>
                  <th>Password</th>
                  <th>Address</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {allEmploye.map((item, index) => (
                  <tr key={index}>
                    <td>{item.userId}</td>
                    <td>{item.firstName}</td>
                    <td>{item.lastName}</td>
                    <td>{item.dateOfBirth}</td>
                    <td>{item.personalPhone}</td>
                    <td>{item.alternatePhone}</td>
                    <td>{item.email}</td>
                    <td>{item.companyEmail}</td>
                    <td>{item.highestQualification}</td>
                    <td>{item.adharCard}</td>
                    <td>{item.panCard}</td>
                    <td>{item.password}</td>
                    <td>{item.address}</td>
                    <td>
                      <NavLink
                        className={style.button}
                        to={`/update/${item._id}`}
                      >
                        Edit
                      </NavLink>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No employee data available.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default HrViewEmploye;
