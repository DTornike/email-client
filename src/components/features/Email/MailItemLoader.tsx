import { Skeleton, Stack } from "@mui/material";

export const MailItemLoader = () => (
  <Stack gap={2}>
    <Skeleton variant="rectangular" height="50px" />
    <Skeleton variant="rectangular" height="50px" />
    <Skeleton variant="rectangular" height="50px" />
    <Skeleton variant="rectangular" height="50px" />
    <Skeleton variant="rectangular" height="50px" />
  </Stack>
);
