import { Box, Stack, Typography } from "@mui/material";
import { Email } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";

export const EmailEmptyState = () => {
  const theme = useTheme();
  return (
    <Box
      flex={1}
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="500px"
      sx={{
        background: theme.palette.grey[50],
        height: "100%",
      }}
    >
      <Stack alignItems="center" justifyContent="center" gap={1}>
        <Email />
        <Typography color="textDisabled" flex={1}>
          No content found
        </Typography>
      </Stack>
    </Box>
  );
};
