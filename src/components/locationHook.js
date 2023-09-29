import { useEffect, useState } from "react";

export function GetUserLocation() {
  const [location, setLocation] = useState({
    latitude: null,
    longitude: null,
    error: null,
  });
  const [weatherData, setWeatherData] = useState();

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => { 
          setLocation({
            latitude: Number(position.coords.latitude.toFixed(2)),
            longitude: Number( position.coords.longitude.toFixed(2)),
            error: null,
          });
        },
        (error) => setLocation({ error: error })
      );
    } else {
      setLocation({ error: "please set geolocation " });
    }
  }, []);
  const time = new Date().toLocaleString();
  const parts = time.split(/[\s,]+/);
  const [day, month, year] = parts[0].split("/");
  const [hour] = parts[1].split(":");


  const isoDate = `${year}-${month}-${day}T${hour}:00`;
  console.log(isoDate);


  useEffect(() => {
    if (location.longitude !== null && location.latitude !== null) {
      const fetchWeather = async () => {
        const res = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&hourly=temperature_2m,relativehumidity_2m,apparent_temperature,precipitation,rain,showers`
        );
        
        const jsonData = await res.json();
        if (!res.ok) {
            throw new Error("Something Went Wrong, contact the dev");
        } else {
        setWeatherData(jsonData);
        }
      };
      fetchWeather();
    }
  }, [location]);

  return { location, weatherData, isoDate };
}
