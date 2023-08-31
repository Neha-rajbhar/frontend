import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import style from "./UpdateProfile.module.css";
function UpdateProfile() {
  const { id } = useParams();
  console.log(id);

  const [fieldError, setFieldError] = useState({});
  const [userId, setUserId] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [personalPhone, setPersonalPhone] = useState("");
  const [alternatePhone, setAlternatePhone] = useState("");
  const [email, setEmail] = useState("");
  const [companyEmail, setCompanyEmail] = useState("");
  const [highestQualification, setHighestQualification] = useState("");
  const [adharCard, setAdharCard] = useState("");
  const [panCard, setPanCard] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5000/getEmployeById/" + id)
      .then((result) => {
        console.log(result.data);
        const data = result.data;
        if (data) {
          setUserId(data.userId);
          setFirstName(data.firstName);
          setLastName(data.lastName);
          setDateOfBirth(data.dateOfBirth);
          setPersonalPhone(data.personalPhone);
          setAlternatePhone(data.alternatePhone);
          setEmail(data.email);
          setCompanyEmail(data.companyEmail);
          setHighestQualification(data.highestQualification);
          setAdharCard(data.adharCard);
          setPanCard(data.panCard);
          setPassword(data.password);
          setAddress(data.address);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate(
      firstName,
      lastName,
      dateOfBirth,
      personalPhone,
      alternatePhone,
      email,
      companyEmail,
      highestQualification,
      adharCard,
      panCard,
      address
    );

    console.log(
      userId,
      firstName,
      lastName,
      dateOfBirth,
      personalPhone,
      alternatePhone,
      email,
      companyEmail,
      highestQualification,
      adharCard,
      panCard,
      password,
      address
    );
    try {
      const response = await axios.post(
        "http://localhost:5000/updateEmployeById/" + id,
        {
          userId,
          firstName,
          lastName,
          dateOfBirth,
          personalPhone,
          alternatePhone,
          email,
          companyEmail,
          highestQualification,
          adharCard,
          panCard,
          password,
          address,
        }
      );

      if (response.data.status === false) {
        alert(response.data.message);
      } else {
        alert("Employee Updated successfully!");
        navigate("/dash");
      }

      setUserId("");
      setFirstName("");
      setLastName("");
      setDateOfBirth("");
      setPersonalPhone("");
      setAlternatePhone("");
      setEmail("");
      setCompanyEmail("");
      setHighestQualification("");
      setAdharCard("");
      setPanCard("");
      setPassword("");
      setAddress("");
    } catch (error) {
      console.error("Error adding employee:", error);
    }
  };

  useEffect(() => {
    console.log(fieldError);
    if (Object.keys(fieldError).length === 0) {
      console.log(
        userId,
        firstName,
        lastName,
        dateOfBirth,
        personalPhone,
        alternatePhone,
        email,
        companyEmail,
        highestQualification,
        adharCard,
        panCard,
        password,
        address
      );
    }
  }, [fieldError]);

  const validate = () => {
    const error = {};
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!firstName) {
      error.firstName = "FirstName is required";
    }
    if (!lastName) {
      error.lastName = "LastName is required";
    }
    if (!dateOfBirth) {
      error.dateOfBirth = "choose date is required";
    }
    if (!personalPhone) {
      error.personalPhone = "Phone Number is required";
    } else if (personalPhone.length < 10) {
      error.personalPhone = "There should be 10 digits";
    }

    if (!alternatePhone) {
      error.alternatePhone = "Alternate phone number is required";
    } else if (alternatePhone.length < 10) {
      error.alternatePhone = "There should be 10 digits";
    }

    if (!highestQualification) {
      error.highestQualification = "Heighst Qualification is required";
    }
    if (!adharCard) {
      error.adharCard = "Adhar card Number is required";
    }
    if (!panCard) {
      error.panCard = "Pancard Number is required";
    }
    if (!address) {
      error.address = "Address is required";
    }
    if (!email) {
      error.email = "Email is required";
    } else if (!regex.test(email)) {
      error.email = "This is not a valid email format!";
    }
    if (!companyEmail) {
      error.companyEmail = "Company Email is required";
    } else if (!regex.test(companyEmail)) {
      error.companyEmail = "This is not a valid email format!";
    }

    return error;
  };

  const handleRedirect = () => {
    navigate("/dash");
  };

  return (
    <div className={style.main}>
      <div className={style.innerDiv}>
        <h1>Update Form</h1>
        <button className={style.button} onClick={handleRedirect}>
          Home
        </button>
        <form className={style.form} onSubmit={handleSubmit}>
          <div className={style.firstHalf}>
            <label htmlFor="userId">User ID:</label>
            <input
              type="text"
              id="userId"
              name="userId"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              readOnly
            />
            <label>FirstName</label>
            <input
              type="text"
              value={firstName}
              placeholder="Enter Firstname"
              onChange={(e) => setFirstName(e.target.value)}
            />
            <label>LastName</label>
            <input
              type="text"
              value={lastName}
              placeholder="Enter Lastname"
              onChange={(e) => setLastName(e.target.value)}
            />
            <label>Date of Birth</label>
            <input
              type="date"
              value={dateOfBirth}
              placeholder="Select Date of Birth"
              onChange={(e) => setDateOfBirth(e.target.value)}
            />
            <label>Personal Phone Number</label>
            <input
              type="number"
              value={personalPhone}
              placeholder="Enter Personal Phone Number"
              onChange={(e) => setPersonalPhone(e.target.value)}
            />
            <label>Alternate Phone Number</label>
            <input
              type="number"
              value={alternatePhone}
              placeholder="Enter "
              onChange={(e) => setAlternatePhone(e.target.value)}
            />
            <label>Personal Email</label>
            <input
              type="email"
              value={email}
              placeholder="Enter Email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className={style.secondHalf}>
            <label>Company Email</label>
            <input
              type="email"
              value={companyEmail}
              placeholder="Enter Company Email"
              onChange={(e) => setCompanyEmail(e.target.value)}
            />
            <label>Heighst Qualification</label>
            <input
              type="text"
              name="highestQualification"
              value={highestQualification}
              placeholder="Enter Heighst Qualification"
              onChange={(e) => setHighestQualification(e.target.value)}
            />
            <label>Adharcard Number</label>
            <input
              type="text"
              name="adharCard"
              value={adharCard}
              placeholder="Enter Adharcard Number"
              onChange={(e) => setAdharCard(e.target.value)}
            />
            <label>Pancard Number</label>
            <input
              type="text"
              name="panCard"
              value={panCard}
              placeholder="Enter Pan card"
              onChange={(e) => setPanCard(e.target.value)}
            />
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={password}
              placeholder="Enter Password"
              onChange={(e) => setPassword(e.target.value)}
              readOnly
            />
            <label>Address</label>
            <input
              type="text"
              name="address"
              value={address}
              placeholder="Enter Address"
              onChange={(e) => setAddress(e.target.value)}
            />

            <button type="submit">Update Employee</button>
          </div>
        </form>
      </div>
    </div>
  );
}
export default UpdateProfile;
