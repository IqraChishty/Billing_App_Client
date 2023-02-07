import { createTheme } from "@mui/material/styles";
const theme = createTheme({
  palette: {
    primary: {
      main: "#111344",
      light: "#8D90E2",
    },
    secondary: {
      main: "#52154E",
      dark: "#310C2E",
      light:'#e9d7e8',
    },
    text: {
      primary: "#111344",
      secondary: "#FFFFFF",
    },
    neutral: {
      disabled: "#888888",
    },
  },

  spacing: (factor) => `${1 * factor}rem`,

  breakpoints: {
    values: {
      xs: 0,
      mL: 425,
      sm: 600,
      tB: 768,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
  typography: {
    fontFamily: ["Poppins", "sans-serif"].join(","),
  },
});

export default theme;
