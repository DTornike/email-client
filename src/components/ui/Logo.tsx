import { Box, IconButton, Stack, Typography } from "@mui/material";
import EmailLogo from "../../assets/email_logo.png";

export const Logo = () => {
  return (
    <Stack direction="row" alignItems="center" justifyContent="space-between">
      <IconButton disabled>
        <Box
          height="40px"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <img src={EmailLogo} alt="Logo" style={{ height: "100%" }} />
        </Box>
      </IconButton>
      <Typography variant="h6" component="div">
        uMail
      </Typography>
    </Stack>
  );
};
