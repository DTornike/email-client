import { Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";

export const Footer = () => {
  const theme = useTheme();
  return (
    <Box
      component="footer"
      sx={{
        height: "55px",
        py: 2,
        mt: "auto",
        textAlign: "center",
        backgroundColor: theme.palette.grey[100],
        color: theme.palette.text.secondary,
      }}
    >
      <Typography variant="body2">© 2024 Tornike</Typography>
    </Box>
  );
};
