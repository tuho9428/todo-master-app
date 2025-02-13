import React, { useState, useEffect } from "react";
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Alert,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUserThunk } from "../store/auth/authThunk";
import { clearError } from "../store/auth/authSlice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { isLoggedIn, loading, error } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  useEffect(() => {
    if (isLoggedIn) {
      setTimeout(() => {
        navigate("/app/todos");
      }, 2000);
    }
  }, [isLoggedIn, navigate]);

  function handleChange(event) {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (formData.email && formData.password) {
      console.log("submitting email", formData.email);
      dispatch(loginUserThunk(formData));
    }
  }

  return (
    <Container maxWidth="xs">
      <Box mt={8} display="flex" flexDirection="column" alignItems="center">
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <form
          onSubmit={handleSubmit}
          style={{ width: "100%", marginTop: "1rem" }}
        >
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            label="Email"
            placeholder="Enter email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            label="Password"
            placeholder="Enter password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          {isLoggedIn && (
            <Alert severity="success">Login successful! Redirecting...</Alert>
          )}
          {error && <Alert severity="error">{error}</Alert>}
          <Button
            className="btn-hover"
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            style={{ marginTop: "1rem", marginBottom: "1rem" }}
            disabled={loading || isLoggedIn}
          >
            {loading ? "Logging in" : "Login"}
          </Button>
          <div>
            <Typography variant="subtitle2" gutterBottom className="text-end">
              Don't have an account?{" "}
              <Link to="/register">
                <Typography variant="span" className="element">
                  Register
                </Typography>
              </Link>
            </Typography>
          </div>
        </form>
      </Box>
    </Container>
  );
};

export default Login;
