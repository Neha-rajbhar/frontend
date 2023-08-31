import React, { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import style from "./Excel.module.css";

function Excel() {
  const [excelFile, setExcelFile] = useState(null);
  const [excelFileErr, setExcelFileErr] = useState(null);
  const [excelData, setExcelData] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const navigate = useNavigate();

  const options = [
    { value: "client list", label: "Client List" },
    { value: "event list", label: "Event List" },
  ];

  const [remarks, setRemarks] = useState([]);

  const fileType = [
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "application/vnd.ms-excel",
  ];
  const handleFile = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      console.log(selectedFile.type);
      if (selectedFile && fileType.includes(selectedFile.type)) {
        let reader = new FileReader();
        reader.readAsArrayBuffer(selectedFile);
        reader.onload = (e) => {
          setExcelFileErr(null);
          setExcelFile(e.target.result);
        };
      } else {
        setExcelFileErr("Please Upload only excel file");
        setExcelFile(null);
      }
    } else {
      console.log("No file selected");
    }
  };

  useEffect(() => {
    if (excelData) {
      const initialRemarks = Array(excelData.length).fill({
        reamrk1: "",
        reamrk2: "",
      });
      setRemarks(initialRemarks);
    }
  }, [excelData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (excelFile !== null) {
      const workbook = XLSX.read(excelFile, { type: "buffer" });
      const worksheetNames = workbook.SheetNames; // Access sheet names as an array
      const worksheet = workbook.Sheets[worksheetNames[0]];
      const data = XLSX.utils.sheet_to_json(worksheet);
      setExcelData(data);
    } else {
      setExcelData(null);
    }
  };

  const sendExcelDataToBackend = async () => {
    console.log(excelData);

    try {
      const response = await axios.post(
        "http://localhost:5000/uploadExcel",
        { excelData, selectedType: selectedOption?.value },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        console.log("Excel data sent to the backend successfully");
      } else {
        console.error("Failed to send Excel data to the backend");
      }
    } catch (error) {
      console.error("Error sending Excel data:", error);
    }
  };

  const handleData = () => {
    navigate("/fetchExcelData");
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <div className="form-group">
            <label className={style.label}>Select an option</label>
            <Select
              className={style.select}
              options={options}
              value={selectedOption}
              onChange={setSelectedOption}
            />
            <input type="file" className="form-control" onChange={handleFile} />
          </div>
          {excelFileErr && (
            <div className="alert alert-danger">{excelFileErr}</div>
          )}

          {excelFile && (
            <div className="alert alert-danger">No File Selected</div>
          )}
          <button className="btn btn-primary" onClick={handleSubmit}>
            Upload
          </button>
          <button className={style.button} onClick={sendExcelDataToBackend}>
            Send Excel Data to Backend
          </button>
        </div>
      </div>
      <div className="row mt-4">
        <div className="col-md-12">
          <button className={style.view} onClick={handleData}>
            View Excel
          </button>

          {/* {excelData ? (
            <table className="table">
              <thead>
                <tr>
                  <th>Srno</th>
                  <th>CustomerName</th>
                  <th>location</th>
                  <th>mobile</th>
                  <th>alternateMobile</th>
                  <th>email</th>
                  <th>Remark 1</th>
                  <th>Remark 2</th>
                </tr>
              </thead>
              <tbody>
                {excelData?.map((info, index) => (
                  <tr key={index}>
                    <td>{info.Srno}</td>
                    <td>{info.CustomerName}</td>
                    <td>{info.location}</td>
                    <td>{info.mobile}</td>
                    <td>{info.alternateMobile}</td>
                    <td>{info.email}</td>
                    <td>
                      <input
                        type="text"
                        value={remarks[index]?.reamrk1 || ""}
                        onChange={(e) => handleRemark1(e, index)}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        value={remarks[index]?.reamrk2 || ""}
                        onChange={(e) => handleRemark2(e, index)}
                      />
                    </td>
                    <td>
                      <button onClick={(e) => handleExcelData(e, info, index)}>
                        Update
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No file selected or no data available.</p>
          )} */}
        </div>
      </div>
    </div>
  );
}

export default Excel;

// import React, { useState } from "react";
// import { utils, read } from "xlsx";

// function Excel() {
//   const [excelData, setExcelData] = useState();
//   const [msg, setMsg] = useState("");
//   const fileType = [
//     "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
//     "application/vnd.ms-excel",
//   ];
//   const handleFile = (e) => {
//     const selectedFile = e.target.files[0];
//     if (selectedFile) {
//       console.log(selectedFile.type);
//       if (selectedFile && fileType.includes(selectedFile.type)) {
//         let reader = new FileReader();
//         reader.onload = (e) => {
//           const workbook = read(e.target.result);
//           const sheet = workbook.SheetNames;
//           if (sheet.length) {
//             const data = utils.sheet_to_json(workbook.Sheets[sheet[0]]);
//             setExcelData(data);
//           }
//         };
//         reader.readAsArrayBuffer(selectedFile);
//       } else {
//         setMsg("Please Upload only excel file");
//       }
//     }
//   };

//   return (
//     <div>
//       <div>
//         <input type="file" onChange={handleFile} />
//       </div>
//       {excelData?.map((info) => {
//         return (
//           <>
//             <div>
//               <p>{info.User}</p>
//               <p>{info.Salary}</p>
//               <p>{info.Attendance}</p>
//             </div>
//           </>
//         );
//       })}
//     </div>
//   );
// }

// export default Excel;
