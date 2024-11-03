import { List, Divider, Box, Button, IconButton, Tooltip } from "@mui/material";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { useTheme } from "@mui/material/styles";
import { SideBarListItem } from "./SideBarListItem.tsx";
import { useNavigate, useLocation } from "react-router-dom";
import { AlternateEmail } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { ComposeEmailModal } from "../features";

const SIDEBAR_WIDTH = 240;
const CLOSED_SIDEBAR_WIDTH = 64;

type SideBarTypes = {
  open: boolean;
  toggleSidebar: () => void;
};

export const SideBar = ({ open }: SideBarTypes) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  const currentPath = location.pathname;

  const [isTransitionComplete, setIsTransitionComplete] = useState(open);

  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => setIsTransitionComplete(true), 300);
      return () => clearTimeout(timer);
    } else {
      setIsTransitionComplete(false);
    }
  }, [open]);

  const [composeOpen, setComposeOpen] = useState(false);

  const handleCreateEmail = () => {
    setComposeOpen(true);
  };

  const handleCloseCompose = () => {
    setComposeOpen(false);
  };

  return (
    <>
      <Box
        sx={{
          width: open ? SIDEBAR_WIDTH : CLOSED_SIDEBAR_WIDTH,
          height: "calc(100vh - 111px)",
          backgroundColor: theme.palette.secondary.main,
          flexShrink: 0,
          transition: "width 0.3s",
        }}
      >
        <Divider />
        <List>
          <SideBarListItem
            open={open}
            icon={<InboxIcon />}
            label="Inbox"
            onClick={() => navigate("/inbox")}
            isActive={currentPath === "/inbox"}
          />
          <SideBarListItem
            open={open}
            icon={<MailIcon />}
            label="Sent"
            onClick={() => navigate("/sent")}
            isActive={currentPath === "/sent"}
          />
        </List>
        <Divider />
        <Box
          p={1}
          width="100%"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          {open && isTransitionComplete ? (
            <Button variant="contained" fullWidth onClick={handleCreateEmail}>
              Compose Email
            </Button>
          ) : (
            <Tooltip title="Compose Email">
              <IconButton
                onClick={handleCreateEmail}
                sx={{
                  color: theme.palette.primary.main,
                }}
              >
                <AlternateEmail />
              </IconButton>
            </Tooltip>
          )}
        </Box>
      </Box>
      <ComposeEmailModal open={composeOpen} onClose={handleCloseCompose} />
    </>
  );
};
