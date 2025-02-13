import React, { useState, useEffect } from "react";
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Alert,
} from "@mui/material";
import { Link } from "react-router-dom";
import { loginUserThunk, registerUserThunk } from "../../store/auth/authThunk";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearError, clearIsRegistered } from "../../store/auth/authSlice";

const AuthForm = ({ title, linkText, linkPath, linkDescription }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoggedIn, isRegistered, loading, error } = useSelector(
    (state) => state.auth
  );

  const [formData, setFormData] = useState({ email: "", password: "" });

  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  useEffect(() => {
    if (isRegistered && title === "Register") {
      setTimeout(() => {
        navigate("/login");
        dispatch(clearIsRegistered());
      }, 2000);
    }
  }, [isRegistered, dispatch, navigate]);

  useEffect(() => {
    if (isLoggedIn && title === "Login") {
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
      if (title === "Register") {
        dispatch(registerUserThunk(formData));
      } else if (title === "Login") {
        dispatch(loginUserThunk(formData));
      }
    }
  }
  return (
    <Container maxWidth="xs">
      <Box mt={8} display="flex" flexDirection="column" alignItems="center">
        <Typography component="h1" variant="h5">
          {title}
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
          {(title === "Login" ? isLoggedIn : isRegistered) && (
            <Alert severity="success">
              {title === "Login"
                ? "Login successful! Redirecting..."
                : "Registration successful! Redirecting..."}
            </Alert>
          )}
          {error && <Alert severity="error">{error}</Alert>}
          <Button
            className="btn-hover"
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            style={{ marginTop: "1rem", marginBottom: "1rem" }}
            disabled={
              loading || (title === "Login" ? isLoggedIn : isRegistered)
            }
          >
            {loading ? "Processing..." : title}
          </Button>
          <div>
            <Typography variant="subtitle2" gutterBottom className="text-end">
              {linkDescription}{" "}
              <Link to={linkPath}>
                <Typography variant="span" className="element">
                  {linkText}
                </Typography>
              </Link>
            </Typography>
          </div>
        </form>
      </Box>
    </Container>
  );
};

export default AuthForm;
