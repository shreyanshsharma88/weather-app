import { getHours, parseISO } from "date-fns";
import { useEffect, useState } from "react";
import { apiKey } from "../apiKey/apiKey";

export function GetUserLocation() {
  const testing = false;
  const [location, setLocation] = useState({
    latitude: null,
    longitude: null,
    error: null,
  });
  const [weatherData, setWeatherData] = useState();
  const [dateTime, setDateTime] = useState({
    time: new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    }),
    date: new Date().toLocaleDateString(),
    timesOfDay: "",
  });

  useEffect(() => {
    const intervals = setInterval(() => {
      const hour = getHours(parseISO(dateTime.date));
      setDateTime({
        ...dateTime,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        date: new Date().toLocaleDateString(),
        timesOfDay:
          hour >= 5 && hour < 17
            ? "Morning"
            : hour >= 17 && hour < 19
            ? "Evening"
            : "Night",
      });
    }, 10000);

    return () => clearInterval(intervals);
  }, [dateTime]);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          setLocation({
            latitude: Number(position.coords.latitude.toFixed(2)),
            longitude: Number(position.coords.longitude.toFixed(2)),
            error: null,
          });

          try {
            let res;
            if (testing) {
              res = await fetch(
                `https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&hourly=temperature_2m`
              );
            } else {
              res = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude.toFixed(
                  2
                )}&lon=${position.coords.longitude.toFixed(2)}&appid=${apiKey}`
              );
            }
 
            if (!res.ok) {
              throw new Error("Something Went Wrong, contact the dev");
            } else {
              const jsonData = await res.json();
              setWeatherData(jsonData);
            }
          } catch (error) {
            console.error(error);
            // Handle errors here
          }
        },
        (error) => setLocation({ error: error })
      );
    } else {
      setLocation({ error: "Please enable geolocation in your browser." });
    }
  }, [testing]);

  return { location, weatherData, dateTime };
}
