import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Typography,
  Box,
  Button,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { EmailResponse } from "../../../models";
import { AttachmentPreviewFromUrl } from "../AttachmentPreview/AttachmentPreviewFromUrl.tsx";

type ViewEmailModalProps = {
  open: boolean;
  onClose: () => void;
  email: EmailResponse | null;
};

export const ViewEmailModal: React.FC<ViewEmailModalProps> = ({
  open,
  onClose,
  email,
}) => {
  if (!email) return null;

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>
        View Email
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <Box mb={2}>
          <Typography variant="subtitle2" color="textSecondary">
            From:
          </Typography>
          <Typography variant="body1">{email.sender}</Typography>
        </Box>
        <Box mb={2}>
          <Typography variant="subtitle2" color="textSecondary">
            To:
          </Typography>
          <Typography variant="body1">{email.recipients.join(", ")}</Typography>
        </Box>
        <Box mb={2}>
          <Typography variant="subtitle2" color="textSecondary">
            Subject:
          </Typography>
          <Typography variant="body1">{email.subject}</Typography>
        </Box>
        <Box mb={4}>
          <Typography variant="subtitle2" color="textSecondary">
            Body:
          </Typography>
          <Typography variant="body1">{email.body}</Typography>
        </Box>
        {email.attachment_detail && (
          <Box mb={2}>
            <Typography variant="subtitle2" color="textSecondary">
              Attachments:
            </Typography>
            <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
              <AttachmentPreviewFromUrl {...email.attachment_detail} />
            </Box>
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};
