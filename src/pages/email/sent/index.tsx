import { useEmailService } from "../../../services";
import { useQuery } from "@tanstack/react-query";
import { Stack, Typography } from "@mui/material";
import { MailItem, MailItemLoader } from "../../../components";
import { EmailEmptyState } from "../../../components";

export const Sent = () => {
  const { getSentEmails } = useEmailService();

  const { data: receivedEmails, isLoading } = useQuery({
    queryKey: ["sentEmails"],
    queryFn: () => getSentEmails(),
  });

  return (
    <Stack height="100%">
      <Typography fontWeight="bold" fontSize={18} marginBottom={2}>
        Sent
      </Typography>
      {isLoading ? (
        <MailItemLoader />
      ) : (
        <Stack
          sx={{
            overflow: "auto",
            height: "100%",
          }}
        >
          {!receivedEmails?.data || receivedEmails?.data?.length === 0 ? (
            <EmailEmptyState />
          ) : (
            <Stack gap={2}>
              {receivedEmails?.data?.map((email) => {
                return <MailItem key={email.id} {...email} />;
              })}
            </Stack>
          )}
        </Stack>
      )}
    </Stack>
  );
};
