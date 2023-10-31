import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Button } from "@mui/material";
import { fetchPatients } from "../../Features/patientSlice";

export default function PatientDetails() {
  const { patientId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const patients = useSelector((state) => state.patients.patients);
  const patient = patients.find(({ _id }) => _id === patientId);

  useEffect(() => {
    dispatch(fetchPatients());
  }, [dispatch]);

  return (
    <div className="container">
      <div className="container-data">
        <h1>Patient Details</h1>
        <p>
          <strong>Name:</strong> {patient.name.toUpperCase()}
        </p>
        <p>
          <strong>Age:</strong> {patient.age}
        </p>
        <p>
          <strong>Gender:</strong> {patient.gender.toUpperCase()}
        </p>
        <p>
          <strong>Medical History:</strong>{" "}
          {patient.medicalHistory.toUpperCase()}
        </p>
        <p>
          <strong>Ward:</strong> {patient.ward.toUpperCase()}
        </p>
        <p>
          <strong>Duration:</strong> {patient.duration} days
        </p>
        <p>
          <strong>Contact:</strong> {patient.contact}
        </p>

        <Button
          variant="contained"
          sx={{ width: "50%", display: "block", margin: "1rem auto" }}
          onClick={() => {
            navigate(`/edit/${patient._id}`);
          }}
        >
          Edit
        </Button>
      </div>
    </div>
  );
}
