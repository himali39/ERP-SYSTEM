import { useTheme } from "@emotion/react";
import { Box, Button, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import FlexBetween from "../../components/FlexBetween";
import Header from "../../components/Header";

import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import axios from "axios";

function AddDataForm() {
  const theme = useTheme();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [data, setdata] = useState({});
  const [update, setupdate] = useState(null);
  const { state } = useLocation();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setdata({ ...data, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setdata({ ...data, facultyImg: file });
  };

  /* ------------------------------ submited data ----------------------------- */
  const onSubmit = () => {
    /**Multipart formdata object*/
    let formData = new FormData();

    Object.keys(data).forEach(function (key) {
      if (key === "facultyImg") {
        formData.append(key, data[key]);
      } else {
        formData.append(key, data[key]);
      }
    });

    if (update) {
      axios
        .put(
          `${process.env.REACT_APP_BASE_URL}faculty/updatefaculty/${update}`,
          formData
        )
        .then((res) => {
          // setdata([...data, res.data]);
        });
    } else {
      axios
        .post(`${process.env.REACT_APP_BASE_URL}faculty/addfaculty`, formData)
        .then((res) => {
          console.log(res.data);
          // setdata([...data, res.data]);
        });
    }
    /**Navigate faculty page*/
    navigate("/faculty");
  };

  useEffect(() => {
    if (state && state.userData) {
      setupdate(state.userData._id);
      setdata({
        ...data,
        facultyImg: state.userData.facultyImg,
        facultyName: state.userData.facultyName,
        facultySubject: state.userData.facultySubject,
        facultyAddress: state.userData.facultyAddress,
      });
    }
  }, [state]);

  return (
    <Box m="1.5rem 2.5rem">
      <ToastContainer />
      <FlexBetween>
        <Header title="FACULTY" subtitle="Add new Faculty Data." />
      </FlexBetween>
      <Box
        backgroundColor={theme.palette.background.alt}
        p="1rem"
        borderRadius="0.55rem"
        m="2rem"
        width="fit-content"
      >
        <Box width=" 45rem" p="2rem">
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              fullWidth
              type="file"
              id="outlined-basic"
              variant="outlined"
              value={data.image}
              accept="image/*"
              {...register("facultyImg")}
              name="facultyImg"
              onChange={handleFileChange}
            />

            <TextField
              fullWidth
              id="Full Name"
              label="Full Name"
              variant="outlined"
              style={{ marginTop: "20px" }}
              {...register("facultyName")}
              error={!!errors["facultyName"]}
              helperText={errors.facultyName?.message}
              value={data.facultyName}
              name="facultyName"
              onChange={handleInputChange}
            />

            <TextField
              fullWidth
              style={{ marginTop: "20px" }}
              id="facultySubject"
              label="Subject"
              variant="outlined"
              name="facultySubject"
              value={data.facultySubject}
              {...register("facultySubject")}
              error={!!errors["facultySubject"]}
              helperText={errors.facultySubject?.message}
              onChange={handleInputChange}
            />

            <TextField
              fullWidth
              style={{ marginTop: "20px" }}
              id="outlined-basic"
              label="Resident Address"
              variant="outlined"
              name="facultyAddress"
              value={data.facultyAddress}
              {...register("facultyAddress")}
              error={!!errors["facultyAddress"]}
              helperText={errors.facultyAddress?.message}
              onChange={handleInputChange}
            />

            <Box marginTop="1.3rem">
              <Button
                type="submit"
                variant="outlined"
                sx={{
                  backgroundColor: theme.palette.secondary.light,
                  color: theme.palette.background.alt,
                  margin: "10px ",
                }}
              >
                {update ? "Update" : "Add"}
              </Button>

              <Button
                type="Reset"
                variant="outlined"
                sx={{
                  backgroundColor: theme.palette.secondary.light,
                  color: theme.palette.background.alt,
                }}
              >
                Reset
              </Button>
            </Box>
          </form>
        </Box>
      </Box>
    </Box>
  );
}

export default AddDataForm;
