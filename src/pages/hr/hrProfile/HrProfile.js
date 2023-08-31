import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink, Navigate, useNavigate, useParams } from "react-router-dom";
import { getCurrentUser } from "../../../recoil/atom";
import { useRecoilValue } from "recoil";
import style from "./HrProfile.module.css";

function HrProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentUser, setCurrentHr] = useState([]);
  const [employe, setEmploye] = useState([]);

  const [allEmploye, setAllEmploye] = useState([]);
  const getCurrentEploye = useRecoilValue(getCurrentUser);

  const [image, setImage] = useState(null);
  const [imageName, setImageName] = useState("");
  const [base64Image, setBase64Image] = useState("");
  const [employeProfile, setEmployeProfile] = useState([]);
  const [singleProfiles, setSingleProfile] = useState({});
  const [currentVersion, setCurrentVersion] = useState(1);
  const [previousImage, setPreviousImage] = useState(null);
  const [previousVersion, setPreviousVersion] = useState(0);

  const fetchData = async () => {
    const response = await axios.get("http://localhost:5000/getHrById/" + id);
    setCurrentHr(response.data);
    // console.log(response.data);
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  useEffect(() => {
    const loginData =
      JSON.parse(localStorage.getItem("hrLoginCurrentUser")) || [];
    const employeData = JSON.parse(localStorage.getItem("hrData")) || [];
    const profile = JSON.parse(localStorage.getItem("hrprofiles")) || [];

    setEmploye(loginData);
    setAllEmploye(employeData);
    setEmployeProfile(profile);

    const loggedInUser = loginData[0]; // Assuming the first element is the logged-in user
    console.log("loggedInUser:", loggedInUser);
    console.log("profiles", profile);

    const userProfile = profile?.find(
      (profile) => profile.hrId === loggedInUser.hrId
    );
    console.log("userProfile:", userProfile);

    setSingleProfile(userProfile);
  }, []);

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

      const reading = reader.readAsDataURL(selectedImage);
      console.log(71, reading);
    }
  };

  const handleSubmit = (e, hrId) => {
    e.preventDefault();

    if (!base64Image) {
      return;
    }

    const employeDetails = allEmploye.find((item) => item.hrId === hrId);
    // console.log(employeDetails, "ngdywdgbegy");

    const newProfile = {
      profileimg: base64Image,
      imagename: imageName,
      hrId: hrId,
      employe: employeDetails._id,
      name: employeDetails.firstName,
      lastname: employeDetails.lastName,
    };

    // console.log("profile", newProfile);

    let existingProfiles = JSON.parse(localStorage.getItem("hrprofiles")) || [];

    if (!Array.isArray(existingProfiles)) {
      existingProfiles = [];
    }

    existingProfiles.push(newProfile);

    localStorage.setItem("hrprofiles", JSON.stringify(existingProfiles));
  };

  const handleProfileImageUpload = (e, hrId) => {
    e.preventDefault();
    // alert("nsduwegdyh");
    // console.log("hrId", hrId);
    const hrProfile = JSON.parse(localStorage.getItem("hrprofiles")) || [];
    // console.log("hrProfiles", hrProfile);

    // console.log(base64Image, imageName);
    // const updatedProfiles = hrProfile.filter((item) =>
    //   item.hrId === hrId
    //     ? { ...item, profileimg: base64Image, imagename: imageName }
    //     : item
    // );

    const temp = [...hrProfile];
    const index = temp.findIndex((i) => i.hrId === hrId);
    console.log(index, "index");
    if (index !== -1) {
      const removed = temp.splice(index, 1)[0];

      removed.profileimg = base64Image;
      removed.imagename = imageName;
      console.log(removed);

      temp.push(removed);
      setSingleProfile(removed);
      localStorage.setItem("hrprofiles", JSON.stringify(temp));
    }
  };

  const handelRedirect = () => {
    navigate("/hrDashboard");
  };

  return (
    <div className={style.container}>
      <div className={style.innerDiv}>
        <div className={style.imageSection}>
          <button onClick={handelRedirect}>Logout</button>
          <form>
            <input type="file" onChange={handleImage} />
          </form>

          {employe.map((item) => {
            return (
              <>
                {singleProfiles && singleProfiles.profileimg && (
                  <img
                    className={style.img}
                    width="200px"
                    height="200px"
                    src={singleProfiles.profileimg}
                    alt={""}
                  />
                )}

                <button onClick={(e) => handleSubmit(e, item.hrId)}>
                  Upload Image
                </button>
              </>
            );
          })}

          {singleProfiles && singleProfiles.profileimg && (
            <button
              onClick={(e) => handleProfileImageUpload(e, singleProfiles.hrId)}
            >
              Update Image
            </button>
          )}
        </div>
        <div className={style.detailsSection}>
          <h1>User ID: {currentUser.hrId}</h1>
          <p>First Name: {currentUser.firstName}</p>
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
          <p>Address: {currentUser.address}</p>
          {/* Render other properties of the 'currentUser' object as needed */}
          <NavLink className={style.nav} to={`/updateHrProfile/${id}`}>
            Update Profile Details
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default HrProfile;
