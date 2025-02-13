import { Container, Box, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      <Container maxWidth="sm">
        <Box mt={8} display="flex" flexDirection="column" alignItems="center">
          <Typography
            component="h1"
            variant="h4"
            className="bg-gradient-to-r from-orange-500 via-yellow-500 to-amber-700 font-bold text-4xl text-center mb-4 text-transparent bg-clip-text"
          >
            Welcome to TodoMaster
          </Typography>
          <Link
            className="mt-7"
            to="/app/todos"
            style={{ textDecoration: "none", marginTop: "2rem" }}
          >
            <Button variant="contained" fullWidth className="btn-hover">
              <Typography className="transition ease-in-out hover:cursor-pointer">
                Get Started
              </Typography>
            </Button>
          </Link>
        </Box>
      </Container>
    </>
  );
}

export default Home;
