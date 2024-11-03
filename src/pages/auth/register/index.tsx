import {
  TextField,
  Button,
  Typography,
  Container,
  Box,
  Stack,
} from "@mui/material";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ToggleDarkMode } from "../../../components";
import { useAuthService } from "../../../services";
import { toast } from "react-toastify";
import { useTheme } from "@mui/material/styles";

type RegisterFormInputs = {
  username: string;
  email: string;
  password: string;
  repeatPassword: string;
};

export const Register = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterFormInputs>();
  const theme = useTheme();
  const { register: registerUser } = useAuthService();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<RegisterFormInputs> = async (data) => {
    const { repeatPassword, ...registrationData } = data;

    if (repeatPassword !== registrationData.password) {
      return;
    }

    const response = await registerUser(registrationData);

    if (response?.id) {
      toast.success("Registration successful. Please log in.");
      navigate("/login");
    } else if (response?.error) {
      toast.error(response.error);
    } else {
      toast.error("Registration failed. Please try again.");
    }
  };

  const password = watch("password");

  return (
    <Container>
      <Box
        alignItems="center"
        justifyContent="center"
        display="flex"
        flexDirection="column"
      >
        <Stack
          width="100%"
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="h4" component="h1" gutterBottom>
            Register
          </Typography>
          <ToggleDarkMode />
        </Stack>

        <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
          <TextField
            label="Username"
            variant="filled"
            fullWidth
            margin="normal"
            {...register("username", { required: "Username is required" })}
            error={!!errors.username}
            helperText={errors.username?.message}
          />

          <TextField
            label="Email"
            variant="filled"
            fullWidth
            margin="normal"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Enter a valid email address",
              },
            })}
            error={!!errors.email}
            helperText={errors.email?.message}
          />

          <TextField
            label="Password"
            variant="filled"
            type="password"
            fullWidth
            margin="normal"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters long",
              },
            })}
            error={!!errors.password}
            helperText={errors.password?.message}
          />

          <TextField
            label="Repeat Password"
            variant="filled"
            type="password"
            fullWidth
            margin="normal"
            {...register("repeatPassword", {
              required: "Please repeat your password",
              validate: (value) =>
                value === password || "Passwords do not match",
            })}
            error={!!errors.repeatPassword}
            helperText={errors.repeatPassword?.message}
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ marginTop: 2 }}
          >
            Register
          </Button>
        </form>

        <Box mt={2}>
          <Button
            variant="text"
            fullWidth={false}
            sx={{
              color: theme.palette.info.light,
              textTransform: "none",
            }}
            onClick={() => navigate("/login")}
          >
            Already have an account? Log in
          </Button>
        </Box>
      </Box>
    </Container>
  );
};
