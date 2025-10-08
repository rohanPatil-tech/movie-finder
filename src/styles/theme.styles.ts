import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#00C2FF" },
    secondary: { main: "#FF7A59" },
    background: { default: "#10151B", paper: "#181F27" },
    text: { primary: "#EAF2F7", secondary: "#A6B5C6" },
  },
  shape: { borderRadius: 12 },
  typography: {
    fontFamily: "Inter, sans-serif",
    h6: { fontWeight: 700, letterSpacing: 0.5 },
    button: { fontWeight: 600, textTransform: "none" },
  },
});
