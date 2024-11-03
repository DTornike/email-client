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

type AttachmentPreviewTypes = {
  file: File;
};

export const AttachmentPreview: React.FC<AttachmentPreviewTypes> = ({
  file,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const getFilePreview = () => {
    if (file && file.type.startsWith("image/")) {
      return URL.createObjectURL(file);
    }
    return null;
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
        {file.type.startsWith("image/") ? (
          <img
            src={getFilePreview() || undefined}
            alt={file.name}
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
          {file.type.startsWith("image/") ? (
            <img
              src={getFilePreview() || undefined}
              alt={file.name}
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
              <p>{file.name}</p>
            </Box>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};
