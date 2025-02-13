import React from "react";
import { Card, CardContent, Typography, Container } from "@mui/material";

const ErrorBlock = ({ title, errorMessage }) => {
  return (
    <Container maxWidth="sm" className="pt-8">
      <Card className="bg-red-50 shadow-lg rounded-lg">
        <CardContent>
          <Typography variant="h5" className="text-red-600 text-center">
            {title}
          </Typography>
          <Typography className="text-red-500 text-center mt-2">
            {errorMessage}
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
};

export default ErrorBlock;
