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
import {
  ArrowBackIosOutlined,
  ErrorOutlineOutlined,
  MarkunreadOutlined,
} from "@mui/icons-material";

const Forgotpassword = () => {
  const theme = useTheme();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

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
          <ErrorOutlineOutlined
            style={{
              fontSize: "7rem",
            }}
          />
          {error && (
            <Box role="alert" color="#ff5b00b0">
              {error}
            </Box>
          )}
          <Typography
            variant="h4"
            sx={{
              color: theme.palette.secondary[100],
              display: "flex",
              justifyContent: "center",
            }}
          >
            Forgot Password
          </Typography>
        </Box>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Box>
            <TextField
              fullWidth
              id="Email"
              label="Email"
              variant="outlined"
              sx={{ marginTop: "20px" }}
              {...register("email", { required: "Email is required" })}
              name="email"
              placeholder="Enter your Email"
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

            <Box display="grid">
              <Button
                type="submit"
                variant="outlined"
                sx={{
                  backgroundColor: theme.palette.secondary.light,
                  color: theme.palette.background.alt,
                  fontSize: "1rem",
                  mt: "1.5rem",
                }}
              >
                {loading ? "Loading..." : "Submit"}
              </Button>

              <Link to={"/"}>
                <Typography
                  variant="h6"
                  sx={{
                    color: theme.palette.secondary[100],
                    display: "flex",
                    justifyContent: "center",
                    mt: "1rem",
                  }}
                >
                  <ArrowBackIosOutlined
                    sx={{ fontSize: "1rem", mt: "0.18rem" }}
                  />
                  Back to login
                </Typography>
              </Link>
            </Box>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default Forgotpassword;
