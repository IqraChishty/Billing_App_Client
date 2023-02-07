import { Box, CircularProgress, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BtnPrimary, BtnSecondary } from "../components";
import { getUserDetails } from "../services/api-calls";
import { logout } from "../services/auth";
import { STATUSES } from "../services/requests";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [status, setStatus] = useState(STATUSES.IDLE);
  let navigate = useNavigate();

  const getUserInfo = async () => {
    setStatus(STATUSES.LOADING);
    try {
      let response = await getUserDetails();
      if (response.data.success) {
        setUser(response.data.user);
        setStatus(STATUSES.IDLE);
      }
    } catch (error) {
      setStatus(STATUSES.ERROR);
      // console.log(error);
    }
  };

  useEffect(() => {
    getUserInfo();
  }, []);
  return (
    <div>
      {status === STATUSES.LOADING || !user || status === STATUSES.ERROR ? (
        <Stack minHeight="100vh" alignItems="center" justifyContent="center">
          {status === STATUSES.LOADING && <CircularProgress />}
          {status === STATUSES.ERROR && <div>Something went wrong :(</div>}
        </Stack>
      ) : (
        <Stack
          minHeight="100vh"
          alignItems="center"
          justifyContent="center"
          gap="3rem"
          sx={{ textAlign: "center" }}
        >
          <Box>
            <Typography variant="h3">Good Morning!</Typography>
            <Typography variant="h4">{user?.name}</Typography>
          </Box>

          <Stack gap="1rem" minWidth="20rem">
            <BtnPrimary
              btnText="Create Slab"
              onClick={() => {
                navigate("/create-slab");
              }}
            />
            <BtnPrimary
              btnText="Add new bill"
              onClick={() => {
                navigate("/create-bill");
              }}
            />
            <BtnPrimary
              btnText="View Calculations"
              onClick={() => {
                navigate("/calculations");
              }}
            />
            <BtnSecondary
              btnText="logout"
              onClick={() => {
                logout();
                navigate(0)
                navigate("/");
              }}
            />
          </Stack>
        </Stack>
      )}
    </div>
  );
};

export default Profile;
