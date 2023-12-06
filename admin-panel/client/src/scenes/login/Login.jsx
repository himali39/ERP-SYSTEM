
 //Import necessary libraries
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Box,
  TextField,
  Button,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { useTheme } from "@emotion/react";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useDispatch } from "react-redux";
import { useLoginQuery } from "../../state/api";

const Login = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const 
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  
  const onSubmit = async (data) => {
    try {
      console.log(data);

      // Dispatch the login action
      const userCredentials = {
        email: data.email,
        password: data.password,
      };

      const response = await dispatch(useLoginQuery(userCredentials));

      // Check if the login was successful
      if (response.payload && response.payload.success) {
        // Save user data to local storage
        localStorage.setItem("user", JSON.stringify(response.payload.user));

        // Redirect to the dashboard
        window.location.href = "/dashboard";
      } else {
        // Handle login failure (show error message, etc.)
        console.error("Login failed:", response.payload.message);
      }
    } catch (error) {
      console.error("An error occurred during login:", error);
    }
  };

  // const onSubmit = (data) => {
  //   console.log(data);
  //   window.location.href = "/dashboard";

  //   let userCredentials={
  //     email,password
  //   }
  //   dispatch(uselogin(userCredentials));
  //    };
  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Box m="1.5rem 2.5rem" position="absolute" top="20%" left="30%">
      <Box
        backgroundColor={theme.palette.background.alt}
        p="1.5rem"
        borderRadius="0.55rem"
        m="2.5rem"
        width="fit-content"
      >
        <Box textAlign="center">
          <PersonOutlineIcon
            style={{
              fontSize: 110,
              marginBottom: 16,
              padding: 15,
              borderRadius: 50,
              backgroundColor: theme.palette.grey[600],
            }}
          />
        </Box>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Box>
            <TextField
              fullWidth
              id="outlined-basic"
              label="Email"
              variant="outlined"
              style={{ marginTop: "20px" }}
              {...register("Email", { required: "Email is required" })}
              name="Email"
              error={!!errors.Email}
              helperText={errors.Email?.message}
              InputProps={{
                startAdornment: (
                  <PersonOutlineIcon style={{ marginRight: "8px" }} />
                ),
              }}
            />

            <TextField
              fullWidth
              id="outlined-basic"
              label="Password"
              variant="outlined"
              type={showPassword ? "text" : "password"}
              style={{ marginTop: "20px" }}
              {...register("Password", { required: "Password is required" })}
              name="Password"
              error={!!errors.Password}
              helperText={errors.Password?.message}
              InputProps={{
                startAdornment: (
                  <LockOutlinedIcon style={{ marginRight: "8px" }} />
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      edge="end"
                      onClick={handleTogglePassword}
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Box display="grid">
              <Button
                type="submit"
                variant="outlined"
                sx={{
                  backgroundColor: theme.palette.secondary.light,
                  color: theme.palette.background.alt,
                  fontSize: "1rem",
                  margin: "28px ",
                }}
              >
                Login
              </Button>
            </Box>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default Login;