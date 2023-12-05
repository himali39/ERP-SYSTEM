import { useTheme } from "@emotion/react";
import { Box, Button, TextField } from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import FlexBetween from "../../components/FlexBetween";
import Header from "../../components/Header";
import { useAddFacultyMutation } from "../../state/api";

function AddDataForm() {
  const theme = useTheme();
  const { register, handleSubmit } = useForm();
 
  const [saveFormData] = useAddFacultyMutation();
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const onSubmit = (data) => {
      if (image) {
        data.image = image; // Add image data to your form data
      }
    saveFormData(data)
      .unwrap()
      .then((response) => {
        console.log("Mutation response:", response);
      })
      .catch((error) => {
        console.error("Mutation error:", error);
      });
    console.log("data", data);
    // window.location.href = "/faculty";
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
            <input
              type="file"
              onChange={handleImageChange}
              accept="image/*"
              style={{ marginTop: "20px" }}
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
