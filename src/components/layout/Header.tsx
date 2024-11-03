import { Box, IconButton, Stack } from "@mui/material";
import { ToggleDarkMode, AccountDropdown } from "../features";
import { Logo } from "../ui/Logo.tsx";
import MenuIcon from "@mui/icons-material/Menu";
import { MenuOpen } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import { useUsersService } from "../../services/usersService.ts";
import { useEffect } from "react";

type HeaderTypes = {
  sidebarOpen?: boolean;
  toggleSidebar?: () => void;
};

export const Header = ({ sidebarOpen, toggleSidebar }: HeaderTypes) => {
  const theme = useTheme();
  const { getCurrentUser } = useUsersService();

  useEffect(() => {
    void getCurrentUser();
  }, [getCurrentUser]);

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.primary.main,
        display: "flex",
        justifyContent: "space-between",
        px: "14px",
      }}
    >
      <Stack flexDirection="row" alignItems="center">
        <IconButton onClick={toggleSidebar}>
          {sidebarOpen ? <MenuOpen /> : <MenuIcon />}
        </IconButton>
        <Logo />
      </Stack>

      <Stack
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
      >
        <ToggleDarkMode />
        <AccountDropdown />
      </Stack>
    </Box>
  );
};
