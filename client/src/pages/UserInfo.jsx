import React, { useEffect } from "react";
import toast from "react-hot-toast";
import {
  Container,
  Typography,
  Card,
  CardContent,
  Skeleton,
} from "@mui/material";
import Profile from "./Profile";
import { useDispatch, useSelector } from "react-redux";
import { getUserThunk } from "../store/user/userThunk";

const UserInfo = () => {
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getUserThunk());
  }, [dispatch]);

  if (loading) {
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
  }

  if (error) {
    toast.error(error);
    return (
      <Container maxWidth="sm" className="pt-8">
        <Card className="bg-red-50 shadow-lg rounded-lg">
          <CardContent>
            <Typography variant="h5" className="text-red-600 text-center">
              Error fetching user data
            </Typography>
            <Typography className="text-red-500 text-center mt-2">
              {error}
            </Typography>
          </CardContent>
        </Card>
      </Container>
    );
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
