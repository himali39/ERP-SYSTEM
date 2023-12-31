//Import necessary libraries
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Box,
  TextField,
  Button,
  IconButton,
  InputAdornment,
  Typography,
} from "@mui/material";
import { useTheme } from "@emotion/react";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { resetLoginState, loginAdmin } from "../../state";
import { MarkunreadOutlined } from "@mui/icons-material";

const Login = () => {
  const theme = useTheme();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.reducer.adminReducer);

  /* ------------------------- onsubmit data function ------------------------- */
  const onSubmit = async (data) => {
    await dispatch(resetLoginState);
    await dispatch(loginAdmin(data))
      .then((result) => {
        !result.error && navigate("/dashboard");
      })
      .catch((error) => console.log(error.message));
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
        width="30rem"
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

          <Typography
            variant="h4"
            sx={{
              color: theme.palette.secondary[100],
              display: "flex",
              justifyContent: "center",
            }}
          >
            Login
          </Typography>
        </Box>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Box>
            <TextField
              fullWidth
              id="outlined-basic"
              label="Email"
              variant="outlined"
              style={{ marginTop: "20px" }}
              {...register("email", { required: "Email is required" })}
              name="email"
              // error={!!errors.Email}
              // helperText={errors.Email?.message}
              InputProps={{
                startAdornment: (
                  <MarkunreadOutlined style={{ marginRight: "8px" }} />
                ),
              }}
            />
            {errors.email && (
              <Typography sx={{ m: "0.7rem", color: "#e12a2a" }}>
                {errors.email.message}
              </Typography>
            )}
            <TextField
              fullWidth
              id="outlined-basic1"
              label="Password"
              variant="outlined"
              type={showPassword ? "text" : "password"}
              style={{ marginTop: "20px" }}
              {...register("password", { required: "Password is required" })}
              name="password"
              // error={!!errors.Password}
              // helperText={errors.Password?.message}
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
            {errors.Password && (
              <Typography sx={{ m: "0.7rem", color: "#e12a2a" }}>
                {errors.Password.message}
              </Typography>
            )}
            <Link to={"/forget-password"}>
              <Typography
                variant="h6"
                sx={{
                  color: theme.palette.secondary[100],
                  display: "flex",
                  justifyContent: "right",
                  mt: "1rem",
                }}
              >
                Forget Password
              </Typography>
            </Link>
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
                {loading ? "Loading..." : "Login"}
              </Button>
            </Box>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default Login;
