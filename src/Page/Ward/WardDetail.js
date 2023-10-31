import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Button } from "@mui/material";
import { fetchWards } from "../../Features/wardSlice";

export default function WardDetail() {
  const { wardId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const wards = useSelector((state) => state.wards.wards);
  const ward = wards.find(({ _id }) => _id === wardId);

  useEffect(() => {
    dispatch(fetchWards());
  }, [dispatch]);

  return (
    <div className="container">
      <div className="container-data">
        <h1>Ward Details</h1>
        <p>
          <strong>Name:</strong> {ward.name.toUpperCase()}
        </p>
        <p>
          <strong>Specializations:</strong> {ward.specializations.toUpperCase()}
        </p>
        <p>
          <strong>Capacity:</strong> {ward.capacity}
        </p>
        <p>
          <strong>Ward Number:</strong> {ward.wardNumber}
        </p>

        <Button
          variant="contained"
          sx={{ width: "50%", display: "block", margin: "1rem auto" }}
          onClick={() => {
            navigate(`/ward/edit/${ward._id}`);
          }}
        >
          Edit
        </Button>
      </div>
    </div>
  );
}
