import { Box, Card } from "@mui/material";
import { ReactNode } from "react";

type AuthLayoutTypes = {
  children: ReactNode;
};

export const AuthLayout = ({ children }: AuthLayoutTypes) => {
  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        placeItems: "center",
        justifyContent: "center",
      }}
    >
      <Card
        sx={{
          padding: "2rem",
          width: 450,
          maxWidth: "100%",
        }}
      >
        {children}
      </Card>
    </Box>
  );
};
