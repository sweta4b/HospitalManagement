import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { Button, TextField } from "@mui/material";
import { editPatient, fetchPatients } from "../../Features/patientSlice";
import { fetchWards } from "../../Features/wardSlice";

export default function PatientEditForm() {
  const { patientId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const patients = useSelector((state) => state.patients.patients);
  const wards = useSelector((state) => state.wards.wards);
  const patient = patients.find(({ _id }) => _id === patientId);

  useEffect(() => {
    dispatch(fetchPatients());
    dispatch(fetchWards());
  }, [dispatch]);

  const [updatedData, setUpdatedData] = useState({
    _id: patient?._id || "",
    name: patient?.name || "",
    medicalHistory: patient?.medicalHistory || "",
    ward: patient?.ward || "",
    contact: patient?.contact || "",
    age: patient?.age || "",
    gender: patient?.gender || "",
    duration: patient?.duration || ""
  });

  const uniqueWards = wards.map(({ name }) => name);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(editPatient({ patientId: patient._id, patientData: updatedData }));
    navigate(`/patient/${patient._id}`);
  };

  return (
    <div className="container">
      <div className="outer-form">
        <h1>Edit Details</h1>
        <form onSubmit={handleSubmit} className="form">
          <TextField
            id="standard-basic"
            label="Name"
            variant="standard"
            type="text"
            value={updatedData.name}
            onChange={(e) =>
              setUpdatedData({ ...updatedData, name: e.target.value })
            }
          />
          <TextField
            id="standard-basic"
            label="MedicalHistory"
            variant="standard"
            type="text"
            value={updatedData.medicalHistory}
            onChange={(e) =>
              setUpdatedData({ ...updatedData, medicalHistory: e.target.value })
            }
          />

          <select
            onChange={(e) =>
              setUpdatedData({ ...updatedData, ward: e.target.value })
            }
          >
            <option>Select Ward</option>
            {uniqueWards.map((ward) => (
              <option value={ward}>{ward}</option>
            ))}
          </select>

          <TextField
            id="standard-basic"
            label="Ward"
            variant="standard"
            type="text"
            value={updatedData.ward}
            onChange={(e) =>
              setUpdatedData({ ...updatedData, ward: e.target.value })
            }
          />
          <TextField
            id="standard-basic"
            label="Duration"
            variant="standard"
            type="text"
            value={updatedData.duration}
            onChange={(e) =>
              setUpdatedData({ ...updatedData, duration: e.target.value })
            }
          />
          <TextField
            id="standard-basic"
            label="Contact"
            variant="standard"
            type="text"
            value={updatedData.contact}
            onChange={(e) =>
              setUpdatedData({ ...updatedData, contact: e.target.value })
            }
          />
          <TextField
            id="standard-basic"
            label="Age"
            variant="standard"
            type="number"
            value={updatedData.age}
            onChange={(e) =>
              setUpdatedData({ ...updatedData, age: e.target.value })
            }
          />
          <TextField
            id="standard-basic"
            label="Gender"
            variant="standard"
            type="text"
            value={updatedData.gender}
            onChange={(e) =>
              setUpdatedData({ ...updatedData, gender: e.target.value })
            }
          />
          <Button
            sx={{ width: "50%", display: "block", margin: "1rem auto" }}
            color="secondary"
            variant="outlined"
            type="submit"
          >
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
}
