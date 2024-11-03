import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Inbox, Login, Register, Sent } from "./pages";
import CssBaseline from "@mui/material/CssBaseline";
import { RequireAuth } from "./components";
import Layout from "./components/layout/Layout";
import { ThemeProvider } from "./providers/ThemeProvider.tsx";
import { AuthLayout } from "./components/layout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <CssBaseline />
        <BrowserRouter>
          <Routes>
            <Route
              path="/login"
              element={
                <AuthLayout>
                  <Login />
                </AuthLayout>
              }
            />
            <Route
              path="/register"
              element={
                <AuthLayout>
                  <Register />
                </AuthLayout>
              }
            />

            <Route
              element={
                <RequireAuth>
                  <Layout />
                </RequireAuth>
              }
            >
              <Route path="/inbox" element={<Inbox />} />
              <Route path="/sent" element={<Sent />} />
              <Route path="*" element={<Navigate to="/inbox" />} />
            </Route>
          </Routes>
        </BrowserRouter>
        <ToastContainer />
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
