import React, { useState } from "react";
import {
  Box,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import CloseIcon from "@mui/icons-material/Close";

type AttachmentPreviewFromUrlProps = {
  url: string;
  name: string;
  type: string;
};

export const AttachmentPreviewFromUrl: React.FC<
  AttachmentPreviewFromUrlProps
> = ({ url, name, type }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Box
        onClick={handleOpenModal}
        sx={{
          display: "flex",
          alignItems: "center",
          cursor: "pointer",
          p: 1,
          border: "1px solid",
          borderColor: "grey.300",
          borderRadius: 1,
          width: 80,
          height: 80,
          justifyContent: "center",
          overflow: "hidden",
          "&:hover": {
            borderColor: "grey.500",
          },
        }}
      >
        {type.startsWith("image/") ? (
          <img
            src={`${import.meta.env.VITE_IMAGE_URL}/${url}`}
            alt={name}
            style={{
              maxWidth: "100%",
              maxHeight: "100%",
              objectFit: "cover",
            }}
          />
        ) : (
          <InsertDriveFileIcon fontSize="large" />
        )}
      </Box>

      <Dialog
        open={isModalOpen}
        onClose={handleCloseModal}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle>
          Attachment Preview
          <IconButton
            aria-label="close"
            onClick={handleCloseModal}
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
          {type.startsWith("image/") ? (
            <img
              src={`${import.meta.env.VITE_IMAGE_URL}/${url}`}
              alt={name}
              style={{
                width: "100%",
                height: "auto",
              }}
            />
          ) : (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <InsertDriveFileIcon fontSize="large" sx={{ mb: 2 }} />
              <p>{name}</p>
            </Box>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};
