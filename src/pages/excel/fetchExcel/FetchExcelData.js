// import axios from "axios";
// import React, { useEffect, useState } from "react";

// function FetchExcelData() {
//   const [distinctTypes, setDistinctTypes] = useState([]);
//   const [selectedType, setSelectedType] = useState(""); // State to store the selected type
//   const [selectedData, setSelectedData] = useState([]);
//   const [remarks, setRemarks] = useState([]);
//   const [excelData, setExcelData] = useState([]);
//   const [employeeRemarks, setEmployeeRemarks] = useState({});
//   const fetchExcel = async () => {
//     try {
//       const response = await axios.get(
//         "http://localhost:5000/fetchDistinctTypes"
//       );
//       if (response.status === 200) {
//         setDistinctTypes(response.data);
//       } else {
//         console.error("Failed to fetch distinct types");
//       }
//     } catch (error) {
//       console.error("Error fetching distinct types:", error);
//     }
//   };

//   const fetchDataByType = async () => {
//     try {
//       const response = await axios.get(
//         `http://localhost:5000/fetchDataByType?type=${selectedType}`
//       );
//       if (response.status === 200) {
//         const updatedSelectedData = response.data.map((item) => {
//           const existingRemarks = employeeRemarks[item._id] || {};
//           return {
//             ...item,
//             remark1: existingRemarks.remark1 || item.remark1 || "",
//             remark2: existingRemarks.remark2 || item.remark2 || "",
//           };
//         });
//         setSelectedData(updatedSelectedData);

//         // setSelectedData(response.data);
//       } else {
//         console.error("Failed to fetch data by type");
//       }
//     } catch (error) {
//       console.error("Error fetching data by type:", error);
//     }
//   };

//   useEffect(() => {
//     fetchExcel();
//   }, []);

//   useEffect(() => {
//     if (selectedType) {
//       fetchDataByType();
//     }
//   }, [selectedType]);

//   //   console.log(distinctTypes, "fetchtype");

//   const handleRemarkChange = (e, index, remarkType) => {
//     const employeeId = selectedData[index]._id;
//     const updatedEmployeeRemarks = { ...employeeRemarks };
//     const employeeRemarksCopy = { ...updatedEmployeeRemarks[employeeId] };
//     employeeRemarksCopy[remarkType] = e.target.value;
//     updatedEmployeeRemarks[employeeId] = employeeRemarksCopy;
//     setEmployeeRemarks(updatedEmployeeRemarks);
//   };

//   const handleRemark1 = (e, index) => {
//     // Create a copy of the remarks array and update the specific remark
//     const newRemarks = [...remarks];
//     newRemarks[index] = { ...newRemarks[index], remark1: e.target.value };
//     setRemarks(newRemarks);
//   };

//   const handleRemark2 = (e, index) => {
//     // Create a copy of the remarks array and update the specific remark
//     const newRemarks = [...remarks];
//     newRemarks[index] = { ...newRemarks[index], remark2: e.target.value };
//     setRemarks(newRemarks);
//   };

//   const handleExcelData = async (e, excelDataRow, index, id) => {
//     e.preventDefault();
//     console.log(id);
//     const data = {
//       type: selectedType,
//       id: id,
//       remark1: employeeRemarks[id]?.remark1 || "",
//       remark2: employeeRemarks[id]?.remark2 || "",
//     };

//     console.log("data", data);
//     try {
//       const response = await axios.post(
//         "http://localhost:5000/updateRemark",
//         data
//       );
//       if (response.status === 200) {
//         alert("data updated sucess");
//       } else {
//         alert("failed to upload");
//       }
//     } catch (err) {
//       console.log("err", err);
//     }

//     console.log("dataaaaaaaaaa", data);
//   };

//   return (
//     <div>
//       <select onChange={(e) => setSelectedType(e.target.value)}>
//         <option value="">Select Type</option>
//         {distinctTypes.map((item) => (
//           <option key={item} value={item}>
//             {item}
//           </option>
//         ))}
//       </select>

//       {selectedData.length > 0 && (
//         <div className="row mt-4">
//           <div className="col-md-12">
//             <table className="table">
//               <thead>
//                 <tr>
//                   <th>Srno</th>
//                   <th>CustomerName</th>
//                   <th>location</th>
//                   <th>mobile</th>
//                   <th>alternateMobile</th>
//                   <th>email</th>
//                   <th>Remark 1</th>
//                   <th>Remark 2</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {selectedData?.map((info, index) => (
//                   <tr key={index}>
//                     <td>{info.Srno}</td>
//                     <td>{info.CustomerName}</td>
//                     <td>{info.location}</td>
//                     <td>{info.mobile}</td>
//                     <td>{info.alternateMobile}</td>
//                     <td>{info.email}</td>
//                     <td>
//                       {info.remark1 ? (
//                         info.remark1
//                       ) : (
//                         <input
//                           type="text"
//                           value={employeeRemarks[info._id]?.remark1 || ""}
//                           onChange={(e) =>
//                             handleRemarkChange(e, index, "remark1")
//                           }
//                         />
//                       )}
//                     </td>
//                     <td>
//                       {info.remark2 ? (
//                         info.remark2
//                       ) : (
//                         <input
//                           type="text"
//                           value={employeeRemarks[info._id]?.remark2 || ""}
//                           onChange={(e) =>
//                             handleRemarkChange(e, index, "remark2")
//                           }
//                         />
//                       )}
//                     </td>
//                     <td>
//                       <button
//                         onClick={(e) =>
//                           handleExcelData(e, info, index, info._id)
//                         }
//                       >
//                         Update
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default FetchExcelData;

import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import style from "./FetchExcelData.module.css";
function FetchExcelData() {
  const [distinctTypes, setDistinctTypes] = useState([]);
  const [selectedType, setSelectedType] = useState(""); // State to store the selected type
  const [selectedData, setSelectedData] = useState([]);
  const [remarks, setRemarks] = useState([]);
  const [excelData, setExcelData] = useState([]);
  const fetchExcel = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/fetchDistinctTypes"
      );
      if (response.status === 200) {
        setDistinctTypes(response.data);
      } else {
        console.error("Failed to fetch distinct types");
      }
    } catch (error) {
      console.error("Error fetching distinct types:", error);
    }
  };

  const fetchDataByType = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/fetchDataByType?type=${selectedType}`
      );
      if (response.status === 200) {
        setSelectedData(response.data);
      } else {
        console.error("Failed to fetch data by type");
      }
    } catch (error) {
      console.error("Error fetching data by type:", error);
    }
  };

  console.log(distinctTypes, "238");
  useEffect(() => {
    fetchExcel();
  }, []);

  useEffect(() => {
    if (selectedType) {
      fetchDataByType();
    }
  }, [selectedType]);

  //   console.log(distinctTypes, "fetchtype");

  const handleRemark1 = (e, index) => {
    // Create a copy of the remarks array and update the specific remark
    const newRemarks = [...remarks];
    newRemarks[index] = { ...newRemarks[index], remark1: e.target.value };
    setRemarks(newRemarks);
  };

  const handleRemark2 = (e, index) => {
    // Create a copy of the remarks array and update the specific remark
    const newRemarks = [...remarks];
    newRemarks[index] = { ...newRemarks[index], remark2: e.target.value };
    setRemarks(newRemarks);
  };

  const handleSubmitRemark1 = async (e, index) => {
    e.preventDefault();
    const id = selectedData[index]._id;
    console.log(id);
    const data = {
      type: selectedType,
      id: id,
      remark1: remarks[index]?.remark1 || "",
    };

    console.log("data", data);
    try {
      const response = await axios.post(
        "http://localhost:5000/updateRemark1",
        data
      );
      if (response.status === 200) {
        alert("data updated sucess");
      } else {
        alert("failed to upload");
      }
    } catch (err) {
      console.log("err", err);
    }

    console.log("dataaaaaaaaaa", data);
  };

  const handleSubmitRemark2 = async (e, index) => {
    e.preventDefault();
    const id = selectedData[index]._id;
    console.log(id);
    const data = {
      type: selectedType,
      id: id,
      remark2: remarks[index]?.remark2 || "",
    };

    console.log("data2", data);
    try {
      const response = await axios.post(
        "http://localhost:5000/updateRemark2",
        data
      );
      if (response.status === 200) {
        alert("data updated sucess");
      } else {
        alert("failed to upload");
      }
    } catch (err) {
      console.log("err", err);
    }

    console.log("dataaaaaaaaaa", data);
  };

  const handleExcelData = async (e, excelDataRow, index, id) => {
    e.preventDefault();
    console.log(id);
    const data = {
      type: selectedType,
      id: id,
      remark1: remarks[index]?.remark1 || "",
      remark2: remarks[index]?.remark2 || "",
    };

    console.log("data", data);
    try {
      const response = await axios.post(
        "http://localhost:5000/updateRemark",
        data
      );
      if (response.status === 200) {
        alert("data updated sucess");
      } else {
        alert("failed to upload");
      }
    } catch (err) {
      console.log("err", err);
    }

    console.log("dataaaaaaaaaa", data);
  };

  return (
    <div className={style.main}>
      <h1>Select Type To View Excel Data</h1>
      <select
        className={style.selectType}
        onChange={(e) => setSelectedType(e.target.value)}
      >
        <option value="">Select Type</option>
        {distinctTypes.map((item) => (
          <option key={item} className={style.selectOption} value={item}>
            {item}
          </option>
        ))}
      </select>

      {selectedData.length > 0 && (
        <div className="row mt-4">
          <div className="col-md-12">
            <table className="table">
              <thead>
                <tr>
                  <th className={style.th}>Srno</th>
                  <th className={style.th}>CustomerName</th>
                  <th className={style.th}>location</th>
                  <th className={style.th}>mobile</th>
                  <th className={style.th}>alternateMobile</th>
                  <th className={style.th}>email</th>
                  <th className={style.th}>Remark 1</th>
                  <th className={style.th}>Remark 2</th>
                </tr>
              </thead>
              <tbody>
                {selectedData?.map((info, index) => (
                  <tr key={index}>
                    <td>{info.Srno}</td>
                    <td>{info.CustomerName}</td>
                    <td>{info.location}</td>
                    <td>{info.mobile}</td>
                    <td>{info.alternateMobile}</td>
                    <td>{info.email}</td>
                    <td>
                      {info.remark1 ? (
                        info.remark1
                      ) : (
                        <div>
                          <input
                            type="text"
                            value={remarks[index]?.remark1 || ""}
                            onChange={(e) => handleRemark1(e, index)}
                          />
                          <button
                            className={style.button}
                            onClick={(e) => handleSubmitRemark1(e, index)}
                          >
                            Update
                          </button>
                        </div>
                      )}
                    </td>
                    <td>
                      {info.remark2 ? (
                        info.remark2
                      ) : (
                        <div>
                          <input
                            type="text"
                            value={remarks[index]?.remark2 || ""}
                            onChange={(e) => handleRemark2(e, index)}
                          />
                          <button
                            className={style.button}
                            onClick={(e) => handleSubmitRemark2(e, index)}
                          >
                            Update
                          </button>
                        </div>
                      )}
                    </td>
                    {/* <td>
                      <button
                        onClick={(e) =>
                          handleExcelData(e, info, index, info._id)
                        }
                      >
                        Update
                      </button>
                    </td> */}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default FetchExcelData;
