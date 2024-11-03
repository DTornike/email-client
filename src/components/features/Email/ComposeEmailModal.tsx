import React, { useState } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Autocomplete,
  Box,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useUsersService } from "../../../services/usersService";
import { Email, User } from "../../../models";
import { useEmailService } from "../../../services";
import { toast } from "react-toastify";
import { AttachmentPreview } from "../AttachmentPreview/AttachmentPreview.tsx";

type ComposeEmailProps = {
  open: boolean;
  onClose: () => void;
};

type ComposeEmailFormInputs = {
  to: User[];
  subject: string;
  body: string;
};

const isEmailResponse = (response: unknown): response is Email => {
  return (
    (response as Email) &&
    typeof response === "object" &&
    "id" in (response as Email)
  );
};

export const ComposeEmailModal: React.FC<ComposeEmailProps> = ({
  open,
  onClose,
}) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ComposeEmailFormInputs>();
  const { fetchUsers } = useUsersService();
  const { sendEmail } = useEmailService();

  const { data: users, isLoading } = useQuery<User[]>({
    queryKey: ["usersList"],
    queryFn: fetchUsers,
  });

  const [isSending, setIsSending] = useState(false);
  const [attachments, setAttachments] = useState<File[]>([]);

  const handleAttachmentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setAttachments(Array.from(e.target.files));
    }
  };

  const handleFormSubmit: SubmitHandler<ComposeEmailFormInputs> = async (
    data,
  ) => {
    setIsSending(true);

    const formData = new FormData();
    formData.append("subject", data.subject);
    formData.append("body", data.body);

    const userIds = data.to.map((user) => user.id);
    for (const user of userIds) {
      formData.append("recipients", user.toString());
    }

    for (const attachment of attachments) {
      formData.append("attachment", attachment);
    }

    const response = await sendEmail(formData);

    if (isEmailResponse(response) && response.id) {
      toast.success("Email sent!");
    } else if ("error" in response) {
      toast.error(response.error);
    }

    setIsSending(false);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Compose Email</DialogTitle>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <DialogContent>
          {isLoading ? (
            <p>Loading users...</p>
          ) : (
            <Controller
              name="to"
              control={control}
              rules={{ required: "Recipients are required" }}
              render={({ field }) => (
                <Autocomplete
                  multiple
                  options={users || []}
                  getOptionLabel={(option: User) => option.email}
                  value={field.value || []}
                  onChange={(_, newValue) => field.onChange(newValue)}
                  isOptionEqualToValue={(option, value) =>
                    option.id === value.id
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="To"
                      margin="normal"
                      error={!!errors.to}
                      helperText={errors.to?.message}
                    />
                  )}
                />
              )}
            />
          )}

          <TextField
            label="Subject"
            fullWidth
            margin="normal"
            {...register("subject", { required: "Subject is required" })}
            error={!!errors.subject}
            helperText={errors.subject?.message}
          />
          <TextField
            label="Body"
            fullWidth
            multiline
            rows={4}
            margin="normal"
            {...register("body", { required: "Email body is required" })}
            error={!!errors.body}
            helperText={errors.body?.message}
          />
          <Box display="flex" gap={2}>
            <Button variant="contained" component="label" sx={{ mt: 2 }}>
              Attach Files
              <input
                type="file"
                hidden
                multiple
                onChange={handleAttachmentChange}
              />
            </Button>
            {attachments.length > 0 && (
              <Button
                component="label"
                sx={{ mt: 2 }}
                onClick={() => setAttachments([])}
              >
                clear
              </Button>
            )}
          </Box>
          <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
            {attachments.map((file, index) => (
              <AttachmentPreview key={index} file={file} />
            ))}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="secondary">
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={isSending}
          >
            Send
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
