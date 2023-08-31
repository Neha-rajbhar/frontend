import React, { useState, useEffect } from "react";
import { Link, NavLink, useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { getCurrentUser } from "../../recoil/atom";
import axios from "axios";
import style from "./Profile.module.css";

function Profile() {
  const { id } = useParams();
  const [employe, setEmploye] = useState([]);

  const [allEmploye, setAllEmploye] = useState([]);
  const getCurrentEploye = useRecoilValue(getCurrentUser);
  const [currentUser, setCurrentUser] = useState([]);
  const [image, setImage] = useState(null);
  const [imageName, setImageName] = useState("");
  const [base64Image, setBase64Image] = useState("");
  const [employeProfile, setEmployeProfile] = useState([]);
  const [singleProfiles, setSingleProfile] = useState([]);

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
    const loginData = JSON.parse(localStorage.getItem("login")) || [];
    const employeData = JSON.parse(localStorage.getItem("employeData")) || [];
    const profile = JSON.parse(localStorage.getItem("profiles")) || [];

    setEmploye(loginData);
    setAllEmploye(employeData);
    setEmployeProfile(profile);

    const loggedInUser = loginData[0]; // Assuming the first element is the logged-in user
    const userProfile = profile.find(
      (profile) => profile.userId === loggedInUser.userId
    );

    setSingleProfile(userProfile);
  }, []);

  console.log("recoil", getCurrentEploye);

  const handleImage = (e) => {
    const selectedImage = e.target.files[0];
    if (selectedImage) {
      setImage(selectedImage);
      setImageName(selectedImage.name); // Store the image name
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64ImageData = event.target.result;
        setBase64Image(base64ImageData);
      };
      reader.readAsDataURL(selectedImage);
    }
  };

  const handleSubmit = (e, userId) => {
    e.preventDefault();

    if (!base64Image) {
      return;
    }

    const employeDetails = allEmploye.find((item) => item.userId === userId);
    console.log(employeDetails, "ngdywdgbegy");

    const newProfile = {
      profileimg: base64Image,
      userId: userId,
      employe: employeDetails._id,
      name: employeDetails.firstName,
      lastname: employeDetails.lastName,
    };

    console.log("profile", newProfile);

    const existingProfiles = JSON.parse(localStorage.getItem("profiles")) || [];

    existingProfiles.push(newProfile);

    localStorage.setItem("profiles", JSON.stringify(existingProfiles));
    // window.location.reload();
  };

  const handleProfileImageUpload = (e, userId) => {
    const updatedProfiles = employeProfile.map((item) =>
      item.userId === userId ? { ...item, profileimg: base64Image } : item
    );

    setEmployeProfile(updatedProfiles);
    localStorage.setItem("profiles", JSON.stringify(updatedProfiles));

    const updatedSingleProfile = { ...singleProfiles, profileimg: base64Image };
    setSingleProfile(updatedSingleProfile);
  };

  return (
    <div className={style.container}>
      <div className={style.mainSection}>
        <div className={style.profileImg}>
          <Link to="/login">Logout</Link>
          <form>
            <input type="file" onChange={handleImage} />
          </form>

          {employe.map((item) => {
            return (
              <>
                {singleProfiles && singleProfiles.profileimg && (
                  <img
                    width="100px"
                    height="100px"
                    src={singleProfiles.profileimg}
                    alt={`Profile of ${singleProfiles.name} ${singleProfiles.lastname}`}
                  />
                )}

                <button onClick={(e) => handleSubmit(e, item.userId)}>
                  Upload Image
                </button>
              </>
            );
          })}

          {singleProfiles && singleProfiles.profileimg && (
            <button
              onClick={(e) =>
                handleProfileImageUpload(e, singleProfiles.userId)
              }
            >
              Update Image
            </button>
          )}
        </div>
        <div className={style.profileDetails}>
          <h1>User ID: {currentUser.userId}</h1>

          <table>
            <tbody>
              <tr>
                <td>Name:</td>
                <td>Values</td>
              </tr>
              <tr>
                <td>First Name:</td>
                <td>{currentUser.firstName}</td>
              </tr>
              <tr>
                <td>Last Name:</td>
                <td>{currentUser.lastName}</td>
              </tr>
              <tr>
                <td>Date of Birth:</td>
                <td>{currentUser.dateOfBirth}</td>
              </tr>
              <tr>
                <td>Personal Phone:</td>
                <td>{currentUser.personalPhone}</td>
              </tr>
              <tr>
                <td>Alternate Phone:</td>
                <td>{currentUser.alternatePhone}</td>
              </tr>
              <tr>
                <td>Email:</td>
                <td>{currentUser.email}</td>
              </tr>
              <tr>
                <td>Company Email:</td>
                <td>{currentUser.companyEmail}</td>
              </tr>
              <tr>
                <td>Highest Qualification:</td>
                <td>{currentUser.highestQualification}</td>
              </tr>
              <tr>
                <td>Adhar Card:</td>
                <td>{currentUser.adharCard}</td>
              </tr>
              <tr>
                <td>Pancard:</td>
                <td>{currentUser.panCard}</td>
              </tr>

              <tr>
                <td>Password:</td>
                <td>{currentUser.password}</td>
              </tr>
              <tr>
                <td>Address:</td>
                <td>{currentUser.address}</td>
              </tr>

              
            </tbody>
          </table>
          {/* <p>First Name: {currentUser.firstName}</p>
          <p>Last Name: {currentUser.lastName}</p>
          <p>Date of Birth: {currentUser.dateOfBirth}</p>
          <p>Personal Phone: {currentUser.personalPhone}</p>
          <p>Alternate Phone: {currentUser.alternatePhone}</p>
          <p>Email: {currentUser.email}</p>
          <p>Company Email: {currentUser.companyEmail}</p>
          <p>Highest Qualification: {currentUser.highestQualification}</p>
          <p>Adhar Card: {currentUser.adharCard}</p>
          <p>Pan Card: {currentUser.panCard}</p>
          <p>Password: {currentUser.password}</p>
          <p>Address: {currentUser.address}</p> */}
        

          <tr>
            <NavLink to={`/updateProfile/${id}`}>
              Update Profile Details
            </NavLink>
          </tr>
        </div>
      </div>
    </div>
  );
}

export default Profile;
