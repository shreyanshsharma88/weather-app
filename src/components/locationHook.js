import { useEffect, useState } from "react";

export function GetUserLocation() {
  const [location, setLocation] = useState({
    latitude: null,
    longitude: null,
    error: null,
  });
  const [weatherData, setWeatherData] = useState();
  const apiKey = "6LDA7N0xUCOwK6FYPpezlEENrstONQEn";

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
        //   console.log(position.coords.latitude);
        //   console.log(position.coords.longitude);
          setLocation({
            latitude: Number(position.coords.latitude.toFixed(4)),
            longitude: Number( position.coords.longitude.toFixed(4)),
            error: null,
          });
        },
        (error) => setLocation({ error: error })
      );
    } else {
      setLocation({ error: "please set geolocation " });
    }
  }, []);



  useEffect(() => {
    if (location.longitude !== null && location.latitude !== null) {
      const fetchWeather = async () => {
        const res = await fetch(
          `https://api.tomorrow.io/v4/weather/forecast?location=${location.latitude},${location.longitude}&apikey=${apiKey}`
        );
        
        console.log(weatherData);
        const jsonData = await res.json();
        if (!res.ok) {
            throw new Error("Something Went Wrong, contact the");
        } else {
        setWeatherData(jsonData);
        }
      };
      fetchWeather();
    }
  }, [location]);

  return { location, weatherData };
}
