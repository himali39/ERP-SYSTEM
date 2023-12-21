import { React, useEffect, useState } from "react";
import {
  useDeleteFacultyMutation,
  useDeleteFacultyQuery,
  useGetFacultyQuery,
} from "../../state/api";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@emotion/react";
import FlexBetween from "../../components/FlexBetween";
import Header from "../../components/Header";
import { FileUploadOutlined, PersonAddAlt1Outlined } from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom";
import no_profile from "../../assets/images/no-image.jpeg";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Faculty = (data) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isNonMobile = useMediaQuery("(min-width: 1000px)");
  // const { isLoading } = useGetFacultyQuery();
  const [formData, setFormData] = useState([]);
  const [isLoading, setLoading] = useState(false);

  const getdata = () => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}faculty/facultyList`)
      .then((res) => {
        setFormData(res.data || []);
      });
  };
  const handleDelete = async (id) => {
    axios
      .delete(`${process.env.REACT_APP_BASE_URL}faculty/deletefaculty/${id}`)
      .then(() => {
        setFormData(formData.filter((e) => e.id !== id));
      });
  };

  useEffect(() => {
    getdata();
    // setLoading(false);
  }, []);

  return (
    <>
      <ToastContainer />
      <Box m="1.5rem 2.5rem">
        <FlexBetween>
          <Header title="FACULTY" subtitle="See list of Faculty." />
          <Box sx={{ display: "inline-flex", width: "28%" }}>
            <Button
              sx={{
                backgroundColor: theme.palette.secondary.light,
                color: theme.palette.background.alt,
                fontSize: "14px",
                fontWeight: "bold",
                mr: "10px",
                width: "100%",
                height: "80%",
              }}
              onClick={() => navigate("/add-data-form")}
            >
              <PersonAddAlt1Outlined sx={{ mr: "10px" }} />
              Add Faculty
            </Button>
            <Button
              sx={{
                backgroundColor: theme.palette.secondary.light,
                color: theme.palette.background.alt,
                fontSize: "14px",
                fontWeight: "bold",
                width: "100%",
                height: "80%",
              }}
              // onClick={handleUploadDataClick}
            >
              <FileUploadOutlined sx={{ mr: "10px" }} />
              File Upload
            </Button>
          </Box>
        </FlexBetween>

        {formData || !isLoading ? (
          <Box
            mt="20px"
            display="grid"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            gridAutoRows="25rem"
            justifyContent="space-between"
            rowGap="20px"
            columnGap="1.33%"
            sx={{
              "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
            }}
          >
            {formData?.map((val, ind) => {
              return (
                <Card
                  key={ind}
                  sx={{
                    backgroundColor: theme.palette.background.alt,
                    borderRadius: "0.55rem",
                    "&:hover": {
                      transform: "translateY(-5px)",
                    },
                  }}
                >
                  <CardContent>
                    <Typography>
                      {val.facultyImg ? (
                        <img
                          // src={`${process.env.REACT_APP_BASE_URL_FACULTY}${val.facultyImg}`}
                          src={`http://localhost:5000/faculty_images/${val.facultyImg}`}
                          alt={val.facultyName}
                          style={{ height: "220px", width: "100%" }}
                        />
                      ) : (
                        <img
                          src={no_profile}
                          alt="No Profile"
                          style={{ height: "220px", width: "100%" }}
                        />
                      )}
                    </Typography>
                    <Typography variant="h5" component="div">
                      {val.facultyName}
                    </Typography>
                    <Typography
                      sx={{ fontSize: 14 }}
                      color={theme.palette.secondary[700]}
                    >
                      {val.facultySubject}
                    </Typography>
                    <Typography variant="body2">
                      {val.facultyAddress}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      variant="secondary"
                      size="small"
                      onClick={() => handleDelete(val._id)}
                    >
                      Delete
                    </Button>
                    <Button
                      variant="secondary"
                      size="small"
                      onClick={() => {
                        navigate("/add-data-form", {
                          state: { userData: val },
                        });
                      }}
                    >
                      {/* navigate("/add-data-form", { state: { userData :val} }) */}
                      Update
                    </Button>
                  </CardActions>
                </Card>
              );
            })}
          </Box>
        ) : (
          <>Loading...</>
        )}
      </Box>
    </>
  );
};

export default Faculty;
