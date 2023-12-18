import React from "react";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import Header from "../../components/Header";
import { useDeleteFacultyMutation, useGetFacultyQuery } from "../../state/api";
import { PersonAddAlt1Outlined } from "@mui/icons-material";
import FlexBetween from "../../components/FlexBetween";
import { useNavigate } from "react-router-dom";
import no_profile from "../../assets/images/no-image.jpeg";
import { useDispatch } from "react-redux";

const Facultys = ({
  id,
  facultyImg,
  facultyName,
  facultyAddress,
  facultySubject,
  // handleDelete,
}) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { mutate: delete_mutate } = useDeleteFacultyMutation(id);
  // const { data } = useDeleteFacultyQuery(id);

  const handleDelete = async () => {
    delete_mutate();
    // try {
    //   await deleteFacultyMutation.mutate({ id: id });
    //   console.log("🚀 ~ file:  deleteFacultyMutation:", deleteFacultyMutation);
    //   console.log(id);
    //   // Optionally, you can dispatch a Redux action to update your state
    // } catch (error) {
    //   console.error("Error deleting faculty:", error);
    // }
  };
  return (
    <Card
      sx={{
        backgroundColor: theme.palette.background.alt,
        borderRadius: "0.55rem",
        "&:hover": {
          // borderColor: theme.vars.palette.primary.outlinedHoverBorder,
          transform: "translateY(-5px)",
        },
      }}
    >
      <CardContent>
        <Typography>
          {facultyImg ? (
            <img
              style={{ height: "220px", width: "100%" }}
              src={`${process.env.REACT_APP_BASE_URL_FACULTY}${facultyImg}`}
              alt={facultyName}
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
          {facultyName}
        </Typography>

        <Typography sx={{ fontSize: 14 }} color={theme.palette.secondary[700]}>
          {facultySubject}
        </Typography>

        <Typography variant="body2">{facultyAddress}</Typography>
      </CardContent>
      <CardActions>
        <Button variant="secondary" size="small" onClick={handleDelete}>
          Delete
        </Button>
        <Button variant="secondary" size="small">
          Edit
        </Button>
      </CardActions>
    </Card>
  );
};

const Faculty = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { data, isLoading } = useGetFacultyQuery();
  const isNonMobile = useMediaQuery("(min-width: 1000px)");

  const handleButtonClick = () => {
    navigate("/add-data-form");
  };

  return (
    <Box m="1.5rem 2.5rem">
      <FlexBetween>
        <Header title="FACULTY" subtitle="See list of Faculty." />
        <Box sx={{ mr: "10px" }}>
          <Button
            sx={{
              backgroundColor: theme.palette.secondary.light,
              color: theme.palette.background.alt,
              fontSize: "16px",
              fontWeight: "bold",
              padding: "6px 20px",
            }}
            onClick={handleButtonClick}
          >
            <PersonAddAlt1Outlined sx={{ mr: "10px" }} />
            AddData
          </Button>
          <Button
            sx={{
              backgroundColor: theme.palette.secondary.light,
              color: theme.palette.background.alt,
              fontSize: "16px",
              fontWeight: "bold",
              padding: "6px 20px",
            }}
          >
            <PersonAddAlt1Outlined sx={{ mr: "10px" }} />
            File Upload
          </Button>
        </Box>
      </FlexBetween>

      {data || !isLoading ? (
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
          {data?.map(
            ({
              Ind,
              facultyImg,
              facultyName,
              facultyAddress,
              facultySubject,
              handleDelete,
              id,
            }) => (
              <Facultys
                key={Ind}
                id={id}
                facultyImg={facultyImg}
                facultyName={facultyName}
                facultyAddress={facultyAddress}
                facultySubject={facultySubject}
                handleDelete={handleDelete}
              />
            )
          )}
        </Box>
      ) : (
        <>Loading...</>
      )}
    </Box>
  );
};

export default Faculty;
