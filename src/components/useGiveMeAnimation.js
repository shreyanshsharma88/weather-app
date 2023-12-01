import { useMemo } from "react";
import sunnyWeather from "./lottie/Animation - sunny.json";
import cloudyAnimation from "./lottie/cloudyAnimation.json";
import mistAnimation from "./lottie/mistAnimation.json";
import rainAnimation from "./lottie/rainAnimation.json";
import smokeAnimation from "./lottie/smokeAnimation.json";
import snowAnimation from "./lottie/snowAnimation.json";
import stormAnimation from "./lottie/thunderstormAnimation.json";

export const useGiveMeAnimation = (weatherData) => {
  const animation = useMemo(() => {
    switch (weatherData?.weather?.[0].main) {
      case "Clear":
        return sunnyWeather;
      case "Clouds":
        return cloudyAnimation;
      case "Mist":
        return mistAnimation;
      case "Rain":
        return rainAnimation;
      case "Smoke":
        return smokeAnimation;
      case "Snow":
        return snowAnimation;
      case "Thunderstorm":
        return stormAnimation;
      default:
        return null;
    }
  }, [weatherData?.weather]);
  return { animation };
};
