import Header from "./Component/Header";
import Patients from "./Page/Patient/Patients";
import { Routes, Route } from "react-router-dom";
import "./styles.css";
import PatientDetails from "./Page/Patient/PatientDetail";
import PatientEditForm from "./Page/Patient/PatientEditForm";
import Ward from "./Page/Ward/Ward";
import WardDetail from "./Page/Ward/WardDetail";
import WardEditForm from "./Page/Ward/WardEditForm";
import Hospital from "./Page/Hospital/Hospital";

export default function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Hospital />} />
        <Route path="/patient" element={<Patients />} />
        <Route path="/patient/:patientId" element={<PatientDetails />} />
        <Route path="/edit/:patientId" element={<PatientEditForm />} />
        <Route path="/ward" element={<Ward />} />
        <Route path="/ward/:wardId" element={<WardDetail />} />
        <Route path="/ward/edit/:wardId" element={<WardEditForm />} />
      </Routes>
    </div>
  );
}
