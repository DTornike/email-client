import { EmailResponse } from "../../../models";
import { Box, Card, styled, Typography } from "@mui/material";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useState } from "react";
import { ViewEmailModal } from "./ViewEmailModal.tsx";
dayjs.extend(relativeTime);

const StyledCard = styled(Card)`
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
  &:active {
    opacity: 0.7;
  }
`;

export const MailItem = (item: EmailResponse) => {
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

  const handleOpenViewModal = () => {
    setIsViewModalOpen(true);
  };

  const handleCloseViewModal = () => {
    setIsViewModalOpen(false);
  };

  return (
    <>
      <StyledCard onClick={handleOpenViewModal}>
        <Box height={50} p={1} display="flex" alignItems="center">
          <Typography variant="body2" color="textSecondary" flex={1}>
            {item.sender}
          </Typography>
          <Typography variant="body2" color="textSecondary" flex={8}>
            {item.body}
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            flex={1}
            textAlign="right"
          >
            {dayjs().to(item.sent_at)}
          </Typography>
        </Box>
      </StyledCard>
      <ViewEmailModal
        open={isViewModalOpen}
        onClose={handleCloseViewModal}
        email={item}
      />
    </>
  );
};
