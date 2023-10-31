import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { Button, TextField } from "@mui/material";
import { editWard, fetchWards } from "../../Features/wardSlice";

export default function WardEditForm() {
  const { wardId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const wards = useSelector((state) => state.wards.wards);
  const ward = wards.find(({ _id }) => _id === wardId);

  useEffect(() => {
    dispatch(fetchWards());
  }, [dispatch]);

  const [updatedData, setUpdatedData] = useState({
    _id: ward?._id || "",
    specializations: ward?.specializations || "",
    capacity: ward?.capacity || "",
    wardNumber: ward?.wardNumber || "",
    name: ward?.name || ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(editWard({ wardId: ward._id, wardData: updatedData }));
    navigate(`/ward/${ward._id}`);
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
              setUpdatedData({
                ...updatedData,
                name: e.target.value
              })
            }
          />
          <TextField
            id="standard-basic"
            label="Specializations"
            variant="standard"
            type="text"
            value={updatedData.specializations}
            onChange={(e) =>
              setUpdatedData({
                ...updatedData,
                specializations: e.target.value
              })
            }
          />
          <TextField
            id="standard-basic"
            label="Capacity"
            variant="standard"
            type="number"
            value={updatedData.capacity}
            onChange={(e) =>
              setUpdatedData({ ...updatedData, capacity: e.target.value })
            }
          />
          <TextField
            id="standard-basic"
            label="Ward Number"
            variant="standard"
            type="number"
            value={updatedData.wardNumber}
            onChange={(e) =>
              setUpdatedData({ ...updatedData, wardNumber: e.target.value })
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
