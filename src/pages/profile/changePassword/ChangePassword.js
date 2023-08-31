import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import style from "./ChangePassword.module.css";

function ChangePassword() {
  const { id } = useParams();
  const [currentUser, setCurrentUser] = useState([]);
  const [oldPassword, setOldPassword] = useState("");
  const [password, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [formError, setFormError] = useState({});
  const [sucessMsg, setSucessMsg] = useState("");

  const navigate = useNavigate();

  const fetchData = async () => {
    const response = await axios.get(
      "http://localhost:5000/getEmployeById/" + id
    );
    setCurrentUser(response.data);

    console.log(response.data);
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  useEffect(() => {
    console.log(formError);
    if (Object.keys(formError).length === 0) {
      console.log(oldPassword, password, confirmPassword);
    }
  }, [formError]);

  const validate = (oldPassword, password, confirmPassword) => {
    const error = {};
    if (!oldPassword) {
      error.oldPassword = "This Field Cannot be empty";
    } else if (currentUser.password !== oldPassword) {
      error.oldPassword = "Old Password is Incorrect Try Again";
    }

    if (!password) {
      error.password = "This Field Cannot be empty";
    }
    if (!confirmPassword) {
      error.confirmPassword = "This Field Cannot be empty";
    } else if (confirmPassword !== password) {
      error.confirmPassword = "Confirm Password is Not Matched To New Password";
    }
    return error;
  };

  const handleSubmit = async (e) => {
    const validationField = validate(oldPassword, password, confirmPassword);

    setFormError(validationField);

    if (Object.keys(validationField).length === 0) {
      e.preventDefault();

      try {
        const response = await axios.post(
          "http://localhost:5000/updatePasswordById/" + id,
          {
            password,
          }
        );

        if (response.data.status === false) {
          alert(response.data.message);
        } else {
          alert("Password Changed successfully!");
          setSucessMsg("Password Change Sucessfully");
          navigate("/dash");
        }
      } catch (err) {
        console.log(err);
        alert(
          "An error occurred while changing the password. Please try again."
        );
      }
    }
  };

  return (
    <div className={style.main}>
      <div className={style.formDiv}>
        {sucessMsg && <p className={style.successMsg}>{sucessMsg}</p>}
        <h1>Change Password</h1>
        <form className={style.form}>
          <label>Old Password</label>
          <input
            type="text"
            value={oldPassword}
            placeholder="Enter Old Password"
            onChange={(e) => setOldPassword(e.target.value)}
          />
          <p className={style.error}>{formError.oldPassword}</p>

          <label>New Password</label>
          <input
            type="text"
            value={password}
            placeholder="Enter New Password"
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <p className={style.error}>{formError.password}</p>
          <label>Confirm Password</label>
          <input
            type="text"
            value={confirmPassword}
            placeholder="Enter Confirm Password"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <p className={style.error}>{formError.confirmPassword}</p>
          <button type="button" onClick={handleSubmit}>
            Change Password
          </button>
        </form>
      </div>
    </div>
  );
}

export default ChangePassword;
