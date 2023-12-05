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
import { useGetFacultyQuery } from "../../state/api";
import { PersonAddAlt1Outlined } from "@mui/icons-material";
import FlexBetween from "../../components/FlexBetween";
// import dotenv from "../../components/dotenv";
import { useNavigate } from "react-router-dom";

const Facultys = ({
  facultyImg,
  facultyName,
  facultyAddress,
  facultySubject,
}) => {
  const theme = useTheme();

  return (
    <Card
      sx={{
        backgroundColor: theme.palette.background.alt,
        borderRadius: "0.55rem",
      }}
    >
      <CardContent>
        <Typography>
          <img
            width="100%"
            height="220px"
            src={`${process.env.REACT_APP_BASE_URL_FACULTY}${facultyImg}`}
            alt={facultyName}
          />
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
        <Button variant="primary" size="small">
          See More
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
        <Box>
          <Button
            sx={{
              backgroundColor: theme.palette.secondary.light,
              color: theme.palette.background.alt,
              fontSize: "14px",
              fontWeight: "bold",
              padding: "1px 20px",
            }}
            onClick={handleButtonClick}
          >
            <PersonAddAlt1Outlined sx={{ mr: "10px" }} />
            AddData
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
              facultyImg,
              facultyName,
              facultyAddress,
              facultySubject,
              id,
            }) => (
              <Facultys
                key={id}
                facultyImg={facultyImg}
                facultyName={facultyName}
                facultyAddress={facultyAddress}
                facultySubject={facultySubject}
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
