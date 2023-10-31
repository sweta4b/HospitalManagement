import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Button, Modal, Box, Typography, TextField } from "@mui/material";
import { addWard, deleteWard, fetchWards } from "../../Features/wardSlice";

export default function Ward() {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const wards = useSelector((state) => state.wards.wards);
  const status = useSelector((state) => state.wards.status);
  const error = useSelector((state) => state.wards.error);
  const [newward, setNewward] = useState({
    name: "",
    specializations: "",
    capacity: "",
    wardNumber: ""
  });

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
      dispatch(fetchWards());
    }
  }, [status, dispatch]);

  const handleAddward = () => {
    // console.log(newward);
    handleClose();
    dispatch(addWard(newward));
  };

  const handleDelete = (wardId) => {
    dispatch(deleteWard(wardId));
  };

  return (
    <div className="container">
      <div className="container-data">
        <h1>Wards List</h1>
        {status === "loading" && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
        {wards.map((ward) => (
          <div key={ward._id}>
            <p>
              <strong>Ward:</strong> {ward.name.toUpperCase()}
            </p>
            <div className="link-btn">
              <button onClick={() => handleDelete(ward._id)}>Delete</button>
              <Link to={`/ward/${ward._id}`}>View Details</Link>
            </div>
          </div>
        ))}
        <Button
          onClick={handleOpen}
          variant="contained"
          sx={{ width: "50%", display: "block", margin: "1rem auto" }}
        >
          Add ward
        </Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Ward Form
            </Typography>
            <TextField
              id="standard-basic"
              label="Name"
              variant="standard"
              type="text"
              onChange={(e) => setNewward({ ...newward, name: e.target.value })}
            />
            <TextField
              id="standard-basic"
              label="Specializations"
              variant="standard"
              type="text"
              onChange={(e) =>
                setNewward({ ...newward, specializations: e.target.value })
              }
            />
            <TextField
              id="standard-basic"
              label="Capacity"
              variant="standard"
              type="number"
              onChange={(e) =>
                setNewward({ ...newward, capacity: e.target.value })
              }
            />
            <TextField
              id="standard-basic"
              label="Ward Number"
              variant="standard"
              type="number"
              onChange={(e) =>
                setNewward({ ...newward, wardNumber: e.target.value })
              }
            />
            <Button
              color="secondary"
              variant="outlined"
              onClick={handleAddward}
            >
              Add
            </Button>
          </Box>
        </Modal>
      </div>
    </div>
  );
}
