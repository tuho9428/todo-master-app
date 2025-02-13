import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { Container, Typography, Card, CardContent } from "@mui/material";
import Profile from "./Profile";
import { useDispatch, useSelector } from "react-redux";
import { getUserThunk } from "../store/user/userThunk";
import LoadingSkeleton from "../components/Loading/LoadingSkeleton.jsx";
import ErrorBlock from "../components/Error/ErrorBlock.jsx";

const UserInfo = () => {
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getUserThunk());
  }, [dispatch]);

  if (loading) {
    return <LoadingSkeleton />;
  }

  if (error) {
    toast.error(error);
    return <ErrorBlock title="Error fetching user data" errorMessage={error} />;
  }

  return (
    <Container maxWidth="sm" className="pt-8">
      <Card className="shadow-lg rounded-lg overflow-hidden">
        <CardContent className="-mt-8">
          <div className="flex justify-between items-start mb-8">
            <div className="bg-white p-2 rounded-full shadow-lg"></div>
            <Profile />
          </div>

          <Typography
            variant="h4"
            className="text-center mb-6 font-bold text-gray-800"
          >
            Welcome back!
          </Typography>

          {user ? (
            <div className="space-y-6">
              <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                <div>
                  <Typography variant="overline" className="text-gray-600">
                    Email Address
                  </Typography>
                  <Typography variant="body1" className="font-semibold">
                    {user.email}
                  </Typography>
                </div>
              </div>

              <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                <div>
                  <Typography variant="overline" className="text-gray-600">
                    Full Name
                  </Typography>
                  <Typography variant="body1" className="font-semibold">
                    {user.name || "Not provided"}
                  </Typography>
                </div>
              </div>

              <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                <div>
                  <Typography variant="overline" className="text-gray-600">
                    Phone Number
                  </Typography>
                  <Typography variant="body1" className="font-semibold">
                    {user.phone || "Not provided"}
                  </Typography>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <Typography variant="body1" className="text-gray-600">
                No user information available.
              </Typography>
            </div>
          )}
        </CardContent>
      </Card>
    </Container>
  );
};

export default UserInfo;
