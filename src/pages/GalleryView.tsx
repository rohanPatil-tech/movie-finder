import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  Button,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Stack,
} from "@mui/material";
import { getGenres, getMoviesByGenre } from "../api/service";
import * as styles from "../styles/GalleryView.styles";

interface Genre {
  id: number;
  name: string;
}

interface Movie {
  id: number;
  title: string;
  poster_path: string | null;
}

interface GalleryViewProps {
  onResultsChange: (movies: Movie[]) => void;
}

const GalleryView: React.FC<GalleryViewProps> = ({ onResultsChange }) => {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [selected, setSelected] = useState<number | null>(null);
  const [movies, setMovies] = useState<Movie[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const loadGenres = async () => {
      const g = await getGenres();
      setGenres(g);
    };
    loadGenres();
  }, []);

  useEffect(() => {
    const loadMovies = async () => {
      if (!selected) {
        setMovies([]);
        onResultsChange([]);
        return;
      }
      const m = await getMoviesByGenre(selected);
      setMovies(m);
      onResultsChange(m);
    };
    loadMovies();
  }, [selected, onResultsChange]);

  const openDetails = (id: number) => {
    navigate(`/movies/details/${id}`);
  };

  return (
    <Container maxWidth="lg" sx={styles.pageContainer}>
      <Box sx={styles.headerBox}>
        <Typography variant="h4" sx={styles.headerTitle}>
          Explore by Genre
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Tap a genre below to discover movies
        </Typography>
      </Box>

      <Stack
        direction="row"
        spacing={1}
        sx={{ flexWrap: "wrap", justifyContent: "center", mb: 3, rowGap: 1.5 }}
      >
        {genres.map((g) => (
          <Button
            key={g.id}
            variant={selected === g.id ? "contained" : "outlined"}
            color="primary"
            size="small"
            onClick={() => setSelected(g.id === selected ? null : g.id)}
          >
            {g.name}
          </Button>
        ))}
      </Stack>

      <Box sx={styles.gridWrapper}>
        {movies.map((m) => (
          <Card key={m.id} sx={styles.card}>
            <CardActionArea onClick={() => openDetails(m.id)}>
              <CardMedia
                component="img"
                height="320"
                image={
                  m.poster_path
                    ? `https://image.tmdb.org/t/p/w500${m.poster_path}`
                    : ""
                }
                alt={m.title}
              />
              <CardContent sx={styles.cardContent}>
                <Typography
                  variant="subtitle1"
                  fontWeight={600}
                  noWrap
                  title={m.title}
                >
                  {m.title}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
      </Box>

      {movies.length === 0 && (
        <Box sx={styles.emptyState}>
          <Typography>No movies yet — pick a genre above.</Typography>
        </Box>
      )}
    </Container>
  );
};

export default GalleryView;
