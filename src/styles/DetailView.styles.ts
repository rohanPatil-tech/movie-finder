import { SxProps, Theme } from "@mui/material";

export const container: SxProps<Theme> = {
  mt: 4,
};

export const paper: SxProps<Theme> = {
  p: 3,
  borderRadius: 3,
  display: "grid",
  gridTemplateColumns: { xs: "1fr", sm: "260px 1fr" },
  gap: 3,
  alignItems: "start",
};

export const posterBox: SxProps<Theme> = {
  width: "100%",
  aspectRatio: "2/3",
  borderRadius: 2,
  overflow: "hidden",
  bgcolor: "background.default",
  boxShadow: 1,
};

export const title: SxProps<Theme> = {
  fontWeight: 700,
  mb: 1,
};

export const metaRow: SxProps<Theme> = {
  color: "text.secondary",
  mb: 2,
};

export const overview: SxProps<Theme> = {
  whiteSpace: "pre-wrap",
};

export const navButtons: SxProps<Theme> = {
  mt: 3,
  justifyContent: "space-between",
};
