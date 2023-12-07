import { useTheme } from "@emotion/react";
import { Box, Button, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import FlexBetween from "../../components/FlexBetween";
import Header from "../../components/Header";
import { useAddFacultyMutation } from "../../state/api";
import { useNavigate } from "react-router-dom";


function AddDataForm() {
  const theme = useTheme();
  const { register, handleSubmit } = useForm();
  // const [saveFormData] = useAddFacultyMutation();
  const [saveFormData] = useAddFacultyMutation();
    const navigate = useNavigate();

  const onSubmit = (data) => {
    /**Multipart formdata object*/
    let formData = new FormData();

    Object.keys(data).forEach(function (key) {
      if (key === "facultyImg") {
        formData.append(key, data[key][0]);
      } else {
        formData.append(key, data[key]);
      }
    });

    /**Using FacultyMutation API through save form data  */
    saveFormData(formData)
      .unwrap()
      .then((response) => {
        console.log("Mutation response:", response);
      })
      .catch((error) => {
        console.error("Mutation error:", error);
      });
   
/**Navigate faculty page*/
   navigate("/faculty");
  };
  return (
    <Box m="1.5rem 2.5rem">
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
              {...register("facultyImg")}
              name="facultyImg"
              // onChange={handleImageChange}
            />

            <TextField
              fullWidth
              id="outlined-basic"
              label="Full Name"
              variant="outlined"
              style={{ marginTop: "20px" }}
              {...register("facultyName")}
              name="facultyName"
            />

            <TextField
              fullWidth
              style={{ marginTop: "20px" }}
              id="outlined-basic"
              label="Subject"
              variant="outlined"
              {...register("facultySubject")}
              name="facultySubject"
            />

            <TextField
              fullWidth
              style={{ marginTop: "20px" }}
              id="outlined-basic"
              label="Resident Address"
              variant="outlined"
              {...register("facultyAddress")}
              name="facultyAddress"
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
