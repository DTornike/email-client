import React, { useState } from "react";
import { CssBaseline, Box, Stack, styled } from "@mui/material";
import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { SideBar } from "./SideBar";

const LayoutContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  ${({ theme }) => `
    background-color: ${theme.palette.background.default};
    color: ${theme.palette.text.primary};
  `}
`;

const Layout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  return (
    <LayoutContainer>
      <CssBaseline />
      <Header sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      <Stack flexGrow={1} flexDirection="row">
        <SideBar open={sidebarOpen} toggleSidebar={toggleSidebar} />
        <Box
          sx={{
            flex: 1,
            padding: "16px",
            height: "calc(100vh - 111px)",
          }}
        >
          <Outlet />
        </Box>
      </Stack>
      <Footer />
    </LayoutContainer>
  );
};

export default Layout;
