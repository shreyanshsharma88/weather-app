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
        <Stack  className="content-container">
          <Stack className="weather-container">
            <Typography variant="h2"> here comes weather</Typography>
          </Stack>

            <Lottie style={{  height:'500px', width:'300px' }} animationData={dayAnimation} />
            <Stack className="weather-container">
            <Typography variant="h2"> here comes search</Typography>
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
    width: "100%",
    display: "flex",
    flexDirection: "row",
    [theme.breakpoints.down('md')]:{
      flexDirection:'column'

    },
    justifyContent:'center',
    alignItems: "center",
    '.weather-container':{
      width:'300px',
      height:'500px',
      backgroundColor:theme.palette.common.white,
      borderRadius:theme.spacing(3),
      boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px'

    },
    ".lottie-container": {
      height: "15%",
      width: "15%",
    },
  },
}));
