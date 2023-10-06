import {
  Box,
  CircularProgress,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import Lottie from "lottie-react";
import React, { useState } from "react";
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
  const [time, setTime] = useState({
    time: new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      date: new Date().toLocaleDateString(),
    }),
  });
  setInterval(() => {
    setTime({
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      date: new Date().toLocaleDateString(),
    });
  }, 1000);
  return (
    <StyledContainer>
      {weatherData ? (
        <Stack className="content-container">
          <Stack className="weather-container">
            <Lottie className="background-image" animationData={dayAnimation} />
            <Stack className="weather-content">
              <Stack className="header-container" direction="row">
                <Typography padding={3} variant="h5">
                  {time?.date}
                </Typography>
                <Typography padding={3} variant="h5">
                  {time?.time}
                </Typography>
              </Stack>
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
  // fontFamily:'Dosis, sans-serif',
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
    width: "90%",
    ".weather-container": {
      borderRadius: theme.spacing(3),
      position: "relative",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "40%",
      [theme.breakpoints.down("md")]: {
        width: "100%",
      },
      overflow: "hidden",
      ".background-image": {
        position: "absolute",
        opacity: 0.8,
        objectFit: "contain",
        borderRadius: "20px",
        overflow: "hidden",
        flex: 1,
        [theme.breakpoints.down("sm")]: {
          width: "100%",
        },
      },
      ".weather-content": {
        width: "100%",
        zIndex: 1,
        color: theme.palette.common.white,
        ".header-container": {
          width: "100%",
          justifyContent: "space-between",
          backgroundColor: theme.palette.common.black,
          opacity: 0.5,
          position: "absolute",
          top: 0,
          height: theme.spacing(7),
          alignItems: "center",
        },
      },
    },
  },
}));
