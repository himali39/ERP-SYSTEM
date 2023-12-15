import { useTheme } from "@emotion/react";
import { Box, Button, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import FlexBetween from "../../components/FlexBetween";
import Header from "../../components/Header";
import { useAddFacultyMutation } from "../../state/api";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AddDataForm() {
  const theme = useTheme();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [saveFormData] = useAddFacultyMutation();
  const navigate = useNavigate();

  /* ------------------------------ submited data ----------------------------- */
  const onSubmit = (data) => {
    console.log("🚀  ~ onSubmit ~ data:", data)
    
    /**Multipart formdata object*/
    let formData = new FormData();

    Object.keys(data).forEach(function (key) {
      if (key === "facultyImg") {
        formData.append(key, data[key][0]);
      } else {
        formData.append(key, data[key]);
      }
    });

    /* ------------ Using FacultyMutation API through save form data ------------ */
    saveFormData(formData)
      .unwrap()
      .then((response) => {
        console.log("Mutation response:", response);
      })
      .catch((error) => {
        console.log("Mutation error:", error);
      });
    console.log("formData", formData);

    /**Navigate faculty page*/
    // navigate("/faculty");
  };

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
              accept="image/*"
              error={!!errors["facultyImg"]}
              helperText={errors.image?.message}
              name="facultyImg"
              {...register("facultyImg" 
              //  { required: "Please enter your faculty Image ",
              // }
              )}
            />

            {errors.facultyImg ? (
              <img
                src={"/assets/profile.jpeg"}
                alt="No Profile"
                style={{ height: "50px", width: "50px", borderRadius: "50%" }}
              />
            ) : (
              <img
                src={"/assets/profile.jpeg"} // Make sure to use the correct path for the selected image
                alt="Selected Profile"
                style={{ height: "50px", width: "50px", borderRadius: "50%" }}
              />
            )}

            <TextField
              fullWidth
              id="outlined-basic"
              label="Full Name"
              variant="outlined"
              style={{ marginTop: "20px" }}
              error={!!errors["facultyName"]}
              helperText={errors.facultyName?.message}
              name="facultyName"
              {...register("facultyName", {
                required: "Please enter your faculty Name.",
              })}
            />

            <TextField
              fullWidth
              style={{ marginTop: "20px" }}
              id="outlined-basic"
              label="Subject"
              variant="outlined"
              name="facultySubject"
              error={!!errors["facultySubject"]}
              helperText={errors.facultySubject?.message}
              {...register("facultySubject", {
                required: "Please enter your Faculty Subject .",
              })}
            />

            <TextField
              fullWidth
              style={{ marginTop: "20px" }}
              id="outlined-basic"
              label="Resident Address"
              variant="outlined"
              name="facultyAddress"
              error={!!errors["facultyAddress"]}
              helperText={errors.facultyAddress?.message}
              {...register("facultyAddress", {
                required: "Please enter your Faculty Address .",
              })}
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
                Submit
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
