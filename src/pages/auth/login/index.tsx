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

type LoginFormInputs = {
  username: string;
  password: string;
};

export const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();
  const theme = useTheme();
  const { login } = useAuthService();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    const response = await login(data);

    if (response?.access) {
      localStorage.setItem("token", response.access);
      localStorage.setItem("refresh_token", response.refresh);
      navigate("/inbox");
    } else if (response?.error) {
      toast.error(response.error);
    } else {
      toast.error("Invalid username or password");
    }
  };

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
            Login
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

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ marginTop: 2 }}
          >
            Login
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
            onClick={() => navigate("/register")}
          >
            Register new account
          </Button>
        </Box>
      </Box>
    </Container>
  );
};
