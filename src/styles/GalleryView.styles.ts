import { SxProps, Theme } from "@mui/material";

export const pageContainer: SxProps<Theme> = {
  mt: 4,
};

export const headerBox: SxProps<Theme> = {
  textAlign: "center",
  mb: 3,
};

export const headerTitle: SxProps<Theme> = {
  fontWeight: 700,
  mb: 1,
};

export const genreChips: SxProps<Theme> = {
  flexWrap: "wrap",
  justifyContent: "center",
  mb: 4,
};

export const gridWrapper: SxProps<Theme> = {
  display: "grid",
  gap: 3,
  gridTemplateColumns: {
    xs: "1fr",
    sm: "repeat(2, 1fr)",
    md: "repeat(3, 1fr)",
    lg: "repeat(4, 1fr)",
  },
};

export const card: SxProps<Theme> = {
  borderRadius: 2,
  boxShadow: 3,
  overflow: "hidden",
  transition: "transform 0.25s",
  "&:hover": { transform: "scale(1.05)" },
};

export const cardContent: SxProps<Theme> = {
  textAlign: "center",
  bgcolor: "background.default",
  minHeight: 56,
};

export const emptyState: SxProps<Theme> = {
  textAlign: "center",
  mt: 6,
  color: "text.secondary",
};
