import { CircularProgress, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BtnPrimary } from "../components";
import { isAuthUser } from "../services/auth";

const Home = () => {
  let navigate = useNavigate();
  const [isAuth] = useState(isAuthUser);
  return (
    <>
      {isAuth ? (
        <Stack minHeight="100vh" alignItems="center" justifyContent="center">
          <CircularProgress />
        </Stack>
      ) : (
        <Stack
          minHeight="100vh"
          alignItems="center"
          justifyContent="center"
          gap="3rem"
          sx={{ textAlign: "center" }}
        >
          <Typography variant="h2">Welcome to Billing App</Typography>
          <Stack gap="1rem" minWidth="20rem">
            <BtnPrimary
              btnText="Login"
              onClick={() => {
                navigate("/login");
              }}
            />
            <BtnPrimary
              btnText="Sign Up"
              onClick={() => {
                navigate("/sign-up");
              }}
            />
          </Stack>
        </Stack>
      )}
    </>
  );
};

export default Home;
