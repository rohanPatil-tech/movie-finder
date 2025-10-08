import React, { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  Container,
  Paper,
  Stack,
  Divider,
} from "@mui/material";
import * as styles from "../styles/DetailView.styles";

type Movie = {
  id: number;
  title: string;
  overview?: string;
  poster_path?: string | null;
  vote_average?: number;
  release_date?: string;
};

interface DetailViewProps {
  movies: Movie[];
}

const DetailView: React.FC<DetailViewProps> = ({ movies }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [idx, setIdx] = useState<number>(-1);

  const movieId = useMemo(() => Number(id), [id]);

  useEffect(() => {
    const i = movies.findIndex((m) => m.id === movieId);
    setIdx(i);
  }, [movieId, movies]);

  if (!movies || movies.length === 0) {
    return (
      <Container maxWidth="md">
        <Box sx={{ mt: 6, textAlign: "center" }}>
          <Typography variant="h6">No movie list available</Typography>
        </Box>
      </Container>
    );
  }

  if (idx === -1 || !movies[idx]) {
    return (
      <Container maxWidth="md">
        <Box sx={{ mt: 6, textAlign: "center" }}>
          <Typography variant="h6">Movie not found</Typography>
        </Box>
      </Container>
    );
  }

  const current = movies[idx];
  const atStart = idx === 0;
  const atEnd = idx === movies.length - 1;

  const goNext = () => {
    if (atEnd) return;
    const next = movies[idx + 1];
    navigate(`/movies/details/${next.id}`);
  };

  const goPrev = () => {
    if (atStart) return;
    const prev = movies[idx - 1];
    navigate(`/movies/details/${prev.id}`);
  };

  return (
    <Container maxWidth="md">
      <Box sx={styles.container}>
        <Paper elevation={3} sx={styles.paper}>
          <Box sx={styles.posterBox}>
            <img
              src={
                current.poster_path
                  ? `https://image.tmdb.org/t/p/w500${current.poster_path}`
                  : ""
              }
              alt={current.title}
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            />
          </Box>

          <Box>
            <Typography variant="h4" sx={styles.title}>
              {current.title}
            </Typography>

            <Stack direction="row" spacing={2} sx={styles.metaRow}>
              <Typography variant="body2">
                <strong>Rating:</strong> {current.vote_average ?? "N/A"}
              </Typography>
              <Divider orientation="vertical" flexItem />
              <Typography variant="body2">
                <strong>Release:</strong> {current.release_date || "N/A"}
              </Typography>
            </Stack>

            <Typography variant="body1" sx={styles.overview}>
              {current.overview || "No overview available."}
            </Typography>

            <Stack direction="row" spacing={2} sx={styles.navButtons}>
              <Button variant="outlined" onClick={goPrev} disabled={atStart}>
                Previous
              </Button>
              <Button variant="contained" onClick={goNext} disabled={atEnd}>
                Next
              </Button>
            </Stack>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default DetailView;
