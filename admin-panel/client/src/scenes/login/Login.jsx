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
import { useAdminLoginMutation } from "../../state/api";
import { selectUser } from "../../state";

const Login = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  
  const [loginMutation] = useAdminLoginMutation();
  

  const onSubmit = async (data) => {
    try {
      console.log(data,"data");
      const response = await loginMutation(data).unwrap();
           
      dispatch(selectUser(response)); // Assuming the response contains user details
    } catch (error) {
      console.error("Login failed", error);
    }
  };
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
