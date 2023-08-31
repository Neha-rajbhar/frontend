import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import style from "./HrView.module.css";

function HrView() {
  const [employe, setEmploye] = useState([]);
  const [allEmploye, setAllEmploye] = useState([]);
  const navigate = useNavigate();

  const fetchData = async () => {
    let response = await axios.get("http://localhost:5000/getHr");
    setAllEmploye(response.data);
    localStorage.setItem("hrData", JSON.stringify(response.data));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    axios
      .delete("http://localhost:5000/deleteHrById/" + id)
      .then((res) => {
        console.log(res);
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  const handleRedirect = () => {
    navigate("/hrCreate");
  };
  return (
    <div className={style.container}>
      <div className={style.innerDiv}>
        <button className={style.add} onClick={handleRedirect}>
          Add Hr
        </button>
        <div className={style.result}>
          {allEmploye.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <th>Hr ID</th>
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
                    <td>{item.hrId}</td>
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
                        to={`/updateHr/${item._id}`}
                      >
                        Edit
                      </NavLink>
                      <button
                        className={style.button}
                        onClick={() => handleDelete(item._id)}
                      >
                        Delete
                      </button>
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

export default HrView;
