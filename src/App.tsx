import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import { AppBar, Toolbar, Button, Typography, Container, CssBaseline, Stack } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";

import ListView from "./pages/ListView";
import GalleryView from "./pages/GalleryView";
import DetailView from "./pages/DetailView";

const theme = createTheme({
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

const App: React.FC = () => {
  const [movieList, setMovieList] = useState<any[]>([]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router basename="/movie-finder">
        <AppBar position="sticky" elevation={0}>
          <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              Movie Explorer
            </Typography>
            <Stack direction="row" spacing={1.5}>
              <Button color="primary" variant="contained" component={Link} to="/movies">
                List
              </Button>
              <Button color="secondary" variant="outlined" component={Link} to="/movies/gallery">
                Gallery
              </Button>
            </Stack>
          </Toolbar>
        </AppBar>

        <Container sx={{ mt: 4 }}>
          <Routes>
            <Route path="/movies" element={<ListView onResultsChange={setMovieList} />} />
            <Route path="/movies/gallery" element={<GalleryView onResultsChange={setMovieList} />} />
            <Route path="/movies/details/:id" element={<DetailView movies={movieList} />} />
            <Route path="*" element={<Navigate to="/movies" replace />} />
          </Routes>
        </Container>
      </Router>
    </ThemeProvider>
  );
};

export default App;
