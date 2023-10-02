import {
  Box,
  CircularProgress,
  Grid,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import Lottie from "lottie-react";
import React from "react";
import { GetUserLocation } from "./locationHook";
import animationData from "./lottie/Animation - sunny.json";
import dayAnimation from "./lottie/animation_day.json";

export default function ShowWeather() {
  const { weatherData } = GetUserLocation();
  if (weatherData) {
    // const { main } = weatherData;

    const data = Object.entries(weatherData);
    console.log(data);
  }

  return (
    <StyledContainer>
      {weatherData ? (
        <Stack className="content-container">
          <Stack className="weather-container">
            <Box className="background-image">
              <Lottie animationData={dayAnimation} />
            </Box>
            <Stack className="weather-content">
              <Typography variant="h4"> here comes weather</Typography>
            </Stack>
          </Stack>
        </Stack>
      ) : (
        <CircularProgress color="info" />
      )}
    </StyledContainer>
  );
}

const StyledContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  display: "flex",
  justifyContent: "center",
  height: "95vh",
  backgroundImage:
    "linear-gradient( 76.3deg,  rgba(44,62,78,1) 12.6%, rgba(69,103,131,1) 82.8% )",
  ".content-container": {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    ".weather-container": {
      borderRadius: theme.spacing(3),
      position: "relative",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      ".background-image": {
        position: "absolute",
        opacity: 0.8,
        objectFit: "contain",
        borderRadius: "20px",
        overflow: "hidden",
        width:400,
        [theme.breakpoints.down('sm')]:{
          width:'100%'
        }
      },
      ".weather-content": {
        // boxShadow:' rgba(0, 0, 0, 0.4) 0px 30px 90px',
        width:'100%',
        zIndex: 1,
        color: theme.palette.common.white,
      },
    },
  },
}));
