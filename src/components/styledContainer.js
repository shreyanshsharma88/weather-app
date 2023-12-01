import { Box } from "@mui/material";
import { styled } from "@mui/system";

export const StyledContainer = styled(Box)(({ theme }) => ({
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
      width: 550,
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
        color: "white",
        ".header-container": {
          width: "100%",
          justifyContent: "space-between",
          backgroundColor: "black",
          opacity: 0.5,
          height: theme.spacing(8),
          alignItems: "center",
        },
        ".temps": {
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          padding: theme.spacing(3),
          ".weather-icon": {
            height: "100%",
          },
        },
      },
    },
  },
}));
