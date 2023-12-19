import React from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { Box } from "@mui/material";
import { useTheme } from "@emotion/react";

const Events = () => {
     const theme = useTheme();
  return (
    <>
      <Box m="3rem 2.5rem">
        <Box
          sx={{
            backgroundColor: theme.palette.background.alt,
            width: "100%",
            height: "40rem",
          }}
        >
          <LocalizationProvider
            dateAdapter={AdapterDayjs}
                      >
            <DateCalendar
              sx={{
                width: "50%",
                // height: "40rem",
                 
              }}
              readOnly
            />
          </LocalizationProvider>
        </Box>
      </Box>
    </>
  );
};

export default Events;
