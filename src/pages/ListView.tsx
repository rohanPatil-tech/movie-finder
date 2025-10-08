import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Container,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  List,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Stack,
  Divider,
  ListItemButton,
} from "@mui/material";
import { getMovies } from "../api/service";
import * as styles from "../styles/ListView.styles";

interface Movie {
  id: number;
  title: string;
  release_date?: string;
  vote_average?: number;
  poster_path?: string | null;
}

interface ListViewProps {
  onResultsChange: (movies: Movie[]) => void;
}

const ListView: React.FC<ListViewProps> = ({ onResultsChange }) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState<"title" | "release_date" | "vote_average">("title");
  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const navigate = useNavigate();

  useEffect(() => {
    const load = async () => {
      const data = await getMovies(query || "avengers");
      setMovies(data);
      onResultsChange(data);
    };
    load();
  }, [query, onResultsChange]);

  const sorted = [...movies].sort((a, b) => {
    const valA = (a as any)[sortBy] ?? "";
    const valB = (b as any)[sortBy] ?? "";
    if (typeof valA === "string") {
      return order === "asc" ? valA.localeCompare(valB) : valB.localeCompare(valA);
    } else {
      return order === "asc" ? valA - valB : valB - valA;
    }
  });

  const goDetail = (id: number) => {
    navigate(`/movies/details/${id}`);
  };

  return (
    <Container maxWidth="md" sx={styles.pageContainer}>
      <Typography variant="h4" sx={styles.headerTitle}>
        Movie Finder
      </Typography>

      <TextField
        fullWidth
        placeholder="Search movies..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        sx={styles.searchField}
      />

      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
        sx={styles.controlsRow}
      >
        <FormControl sx={styles.sortSelect}>
          <InputLabel>Sort By</InputLabel>
          <Select
            value={sortBy}
            label="Sort By"
            onChange={(e) => setSortBy(e.target.value as any)}
          >
            <MenuItem value="title">Title</MenuItem>
            <MenuItem value="release_date">Release Date</MenuItem>
            <MenuItem value="vote_average">Rating</MenuItem>
          </Select>
        </FormControl>

        <Stack direction="row" spacing={1}>
          <Button
            variant={order === "asc" ? "contained" : "outlined"}
            onClick={() => setOrder("asc")}
          >
            Asc
          </Button>
          <Button
            variant={order === "desc" ? "contained" : "outlined"}
            onClick={() => setOrder("desc")}
          >
            Desc
          </Button>
        </Stack>
      </Stack>

      <List sx={styles.movieList}>
        {sorted.map((m, i) => (
          <React.Fragment key={m.id}>
            <ListItemButton onClick={() => goDetail(m.id)} sx={styles.listItem}>
              <ListItemAvatar>
                <Avatar
                  variant="rounded"
                  src={m.poster_path ? `https://image.tmdb.org/t/p/w92${m.poster_path}` : ""}
                  alt={m.title}
                  sx={styles.avatar}
                />
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Typography variant="subtitle1" fontWeight={600}>
                    {m.title}
                  </Typography>
                }
                secondary={
                  <>
                    <Typography variant="body2" color="text.secondary">
                      Release: {m.release_date || "N/A"}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Rating: {m.vote_average ?? "N/A"}
                    </Typography>
                  </>
                }
              />
            </ListItemButton>
            {i < sorted.length - 1 && <Divider component="li" />}
          </React.Fragment>
        ))}
      </List>
    </Container>
  );
};

export default ListView;
