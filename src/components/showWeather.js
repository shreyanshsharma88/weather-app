import {
  Box,
  CircularProgress,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import Lottie from "lottie-react";
import React from "react";
import { GetUserLocation } from "./locationHook";
import dayAnimation from "./lottie/animation_day.json";
import eveningAnimation from "./lottie/animation_evening.json";
import nightAnimation from "./lottie/animation_night.json";
import sunnyWeather from "./lottie/Animation - sunny.json";
import { useTheme } from "@mui/system";

export default function ShowWeather() {
  const { weatherData, dateTime } = GetUserLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <StyledContainer>
      {weatherData ? (
        <Stack className="content-container">
          <Stack className="weather-container">
            <Lottie
              className="background-image"
              animationData={
                dateTime?.timesOfDay === "Morning"
                  ? dayAnimation
                  : dateTime?.timesOfDay === "Evening"
                  ? eveningAnimation
                  : nightAnimation
              }
            />
            <Stack className="weather-content">
              <Stack className="header-container" direction="row">
                <Typography padding={3} variant="h5" fontWeight={900}>
                  {dateTime?.date}
                </Typography>
                <Typography padding={3} variant="h5" fontWeight={900}>
                  {dateTime?.time}
                </Typography>
              </Stack>

              <Stack className="temps">
                <Stack>
                  <Typography variant={isMobile ? "h2" : "h1"}>
                    {(weatherData?.main?.temp / 10).toFixed(0)}&deg;C
                  </Typography>
                  <Typography varaint="h5" fontStyle="italic">
                    {" "}
                    At {weatherData?.name}
                  </Typography>
                </Stack>
                <Lottie className="weather-icon" animationData={sunnyWeather} />
              </Stack>

              <Stack className="temps">
                <Stack direction='column'>
                  <Typography varaint="h2">Humidity</Typography>
                  <Typography variant={isMobile ? "h2" : "h3"}>{weatherData?.main?.humidity}%</Typography>
                </Stack>
                <Stack direction='column'>
                  <Typography varaint="h2">Wind Speed</Typography>
                  <Typography variant={isMobile ? "h2" : "h3"}>{weatherData?.wind?.speed}</Typography>

                </Stack>
              </Stack>
              <Typography fontSize={ isMobile ? 16 :22} fontStyle='italic' fontWeight={900} textAlign='center'>Heyy Buddy, Good {dateTime?.timesOfDay} , Wassup!!</Typography>
           
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
  alignItems: "center",
  height: "95vh",
  backgroundImage:
    "linear-gradient( 76.3deg,  rgba(44,62,78,1) 12.6%, rgba(69,103,131,1) 82.8% )",
  ".content-container": {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
    height: "90%",
    ".weather-container": {
      borderRadius: theme.spacing(3),
      position: "relative",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      width: 600,
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
          height: theme.spacing(8),
          alignItems: "center",
        },
        ".temps": {
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          height: theme.spacing(20),
          padding: theme.spacing(3),
          ".weather-icon": {
            height: "100%",
          },
        },
      },
    },
  },
}));
