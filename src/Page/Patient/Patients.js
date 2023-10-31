import { useEffect, useState } from "react";
import {
  addPatient,
  deletePatient,
  fetchPatients
} from "../../Features/patientSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Button, Modal, Box, Typography, TextField } from "@mui/material";
import { fetchWards } from "../../Features/wardSlice";

export default function Patients() {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const patients = useSelector((state) => state.patients.patients);
  const wards = useSelector((state) => state.wards.wards);
  const status = useSelector((state) => state.patients.status);
  const error = useSelector((state) => state.patients.error);
  const [newPatient, setNewPatient] = useState({
    name: "",
    age: "",
    gender: "",
    medicalHistory: "",
    contact: "",
    ward: "",
    duration: ""
  });

  const uniqueWards = wards.map(({ name }) => name);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    display: "flex",
    flexDirection: "column",
    gap: "10px"
  };

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchPatients());
      dispatch(fetchWards());
    }
  }, [status, dispatch]);

  const handleAddPatient = () => {
    // console.log(newPatient);
    handleClose();
    dispatch(addPatient(newPatient));
  };

  const handleDelete = (patientId) => {
    dispatch(deletePatient(patientId));
  };

  return (
    <div className="container">
      <div className="container-data">
        <h1>Patients List</h1>
        {status === "loading" && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
        {patients.map((patient) => (
          <div key={patient._id}>
            <p>
              <strong>Name:</strong> {patient.name.toUpperCase()}{" "}
            </p>
            <div className="link-btn">
              <button onClick={() => handleDelete(patient._id)}>Delete</button>
              <Link to={`/patient/${patient._id}`}>View Details</Link>
            </div>
          </div>
        ))}
        <Button
          onClick={handleOpen}
          variant="contained"
          sx={{ width: "50%", display: "block", margin: "1rem auto" }}
        >
          Add Patient
        </Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Patient Form
            </Typography>
            <TextField
              id="standard-basic"
              label="Name"
              variant="standard"
              type="text"
              onChange={(e) =>
                setNewPatient({ ...newPatient, name: e.target.value })
              }
            />
            <TextField
              id="standard-basic"
              label="Age"
              variant="standard"
              type="number"
              onChange={(e) =>
                setNewPatient({ ...newPatient, age: e.target.value })
              }
            />
            <TextField
              id="standard-basic"
              label="Gender"
              variant="standard"
              type="text"
              onChange={(e) =>
                setNewPatient({ ...newPatient, gender: e.target.value })
              }
            />
            <TextField
              id="standard-basic"
              label="Medical History"
              variant="standard"
              type="text"
              onChange={(e) =>
                setNewPatient({ ...newPatient, medicalHistory: e.target.value })
              }
            />
            <select
              onChange={(e) =>
                setNewPatient({ ...newPatient, ward: e.target.value })
              }
            >
              <option>Select Ward</option>
              {uniqueWards.map((ward) => (
                <option value={ward}>{ward}</option>
              ))}
            </select>

            <TextField
              id="standard-basic"
              label="Contact"
              variant="standard"
              type="number"
              onChange={(e) =>
                setNewPatient({ ...newPatient, contact: e.target.value })
              }
            />
            <TextField
              id="standard-basic"
              label="Duration"
              variant="standard"
              type="number"
              onChange={(e) =>
                setNewPatient({ ...newPatient, duration: e.target.value })
              }
            />
            <Button
              color="secondary"
              variant="outlined"
              onClick={handleAddPatient}
            >
              Add
            </Button>
          </Box>
        </Modal>
      </div>
    </div>
  );
}
