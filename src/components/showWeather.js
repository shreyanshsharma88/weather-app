import { CircularProgress, Stack, Typography, useTheme } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import Lottie from "lottie-react";
import React from "react";
import { GetUserLocation } from "./locationHook";
import sunnyWeather from "./lottie/Animation - sunny.json";
import dayAnimation from "./lottie/animation_day.json";
import eveningAnimation from "./lottie/animation_evening.json";
import nightAnimation from "./lottie/animation_night.json";
import { StyledContainer } from "./styledContainer";
import { useGiveMeAnimation } from "./useGiveMeAnimation";

export default function ShowWeather() {
  const { weatherData, dateTime } = GetUserLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { animation } = useGiveMeAnimation(weatherData);
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
                <Lottie className="weather-icon" animationData={animation} />
              </Stack>

              <Stack className="temps">
                <Stack direction="column">
                  <Typography varaint="h2">Humidity</Typography>
                  <Typography variant={isMobile ? "h2" : "h3"}>
                    {weatherData?.main?.humidity}%
                  </Typography>
                </Stack>
                <Stack direction="column">
                  <Typography varaint="h2">Wind Speed</Typography>
                  <Typography variant={isMobile ? "h2" : "h3"}>
                    {weatherData?.wind?.speed}
                  </Typography>
                </Stack>
              </Stack>
              <Typography
                fontSize={isMobile ? 16 : 22}
                fontStyle="italic"
                fontWeight={900}
                textAlign="center"
              >
                Heyy Buddy, Good {dateTime?.timesOfDay} , Wassup!!
              </Typography>
            </Stack>
          </Stack>
        </Stack>
      ) : (
        <CircularProgress color="info" />
      )}
    </StyledContainer>
  );
}
