import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { ReactElement } from "react";
import { useTheme } from "@mui/material/styles";

type SidebarListItemTypes = {
  open: boolean;
  icon: ReactElement;
  label: string;
  onClick: () => void;
  isActive: boolean;
};

export const SideBarListItem = ({
  open,
  icon,
  label,
  onClick,
  isActive,
}: SidebarListItemTypes) => {
  const theme = useTheme();
  return (
    <ListItem disablePadding sx={{ display: "block" }} onClick={onClick}>
      <ListItemButton
        sx={[
          {
            minHeight: 48,
            px: 2.5,
            backgroundColor: isActive
              ? theme.palette.secondary.light
              : "transparent",
            "&:hover": {
              opacity: 0.8,
            },
          },
          open
            ? {
                justifyContent: "initial",
              }
            : {
                justifyContent: "center",
              },
        ]}
      >
        <ListItemIcon
          sx={[
            {
              minWidth: 0,
              justifyContent: "center",
              color: "white",
            },
            open
              ? {
                  mr: 3,
                }
              : {
                  mr: "auto",
                },
          ]}
        >
          {icon}
        </ListItemIcon>
        <ListItemText
          primary={label}
          sx={[
            open
              ? {
                  opacity: 1,
                  fontWeight: isActive ? "bold" : "normal",
                  color: "white",
                }
              : {
                  opacity: 0,
                },
          ]}
        />
      </ListItemButton>
    </ListItem>
  );
};
