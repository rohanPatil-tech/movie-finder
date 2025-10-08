import { SxProps, Theme } from "@mui/material";

export const pageContainer: SxProps<Theme> = {
  mt: 4,
};

export const headerTitle: SxProps<Theme> = {
  fontWeight: 700,
  mb: 3,
  textAlign: "center",
};

export const searchField: SxProps<Theme> = {
  mb: 3,
};

export const controlsRow: SxProps<Theme> = {
  mb: 3,
  justifyContent: "space-between",
};

export const sortSelect: SxProps<Theme> = {
  minWidth: 160,
};

export const movieList: SxProps<Theme> = {
  bgcolor: "background.paper",
  borderRadius: 2,
  boxShadow: 3,
  overflow: "hidden",
};

export const listItem: SxProps<Theme> = {
  "&:hover": { bgcolor: "action.hover" },
  display: "flex",
  alignItems: "center",
};

export const avatar: SxProps<Theme> = {
  width: 60,
  height: 90,
  mr: 2,
};
