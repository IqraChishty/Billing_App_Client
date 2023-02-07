import { Stack, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { BtnPrimary } from "../components";

const Error = () => {
  let navigate = useNavigate();
  return (
    <Stack minHeight="100vh" alignItems="center" justifyContent="center">
      <Typography variant="h2" mb='2rem'>:(</Typography>
      <Typography variant="h2" mb='2rem'>Page Not Found</Typography>
      <Stack gap="1rem" minWidth="20rem">
        <BtnPrimary
          btnText="Go back to home"
          onClick={() => {
            navigate("/");
          }}
        />
      </Stack>
    </Stack>
  );
};

export default Error;
