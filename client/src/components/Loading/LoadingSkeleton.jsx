import React from "react";
import { Card, CardContent, Skeleton, Container } from "@mui/material";

const LoadingSkeleton = () => {
  return (
    <Container maxWidth="sm" className="pt-8">
      <Card className="shadow-lg rounded-lg">
        <CardContent className="space-y-4">
          <div className="flex justify-end">
            <Skeleton variant="circular" width={40} height={40} />
          </div>
          <Skeleton variant="text" className="h-12" />
          <Skeleton variant="rectangular" className="h-32" />
        </CardContent>
      </Card>
    </Container>
  );
};

export default LoadingSkeleton;
