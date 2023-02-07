import {Box, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {AlertComp, BtnPrimary, SimpleInput } from "../components";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { STATUSES } from "../services/requests";
import { loginUser } from "../services/api-calls";
import { loginSchema } from "../utils/input-validation-schemas";

const Login = () => {
  const [status, setStatus] = useState(STATUSES.IDLE);
  const [responseMessage, setResponseMessage] = useState("");
  let navigate = useNavigate();

  const handleInputChange = (event) => {
    setStatus(STATUSES.IDLE);
    if (event.target.id === "email" && errors.email) {
      clearErrors("email");
    }
    if (event.target.id === "password" && errors.password) {
      clearErrors("password");
    }
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    clearErrors,
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const submitForm = async (data) => {
    setStatus(STATUSES.LOADING);
    try {
      let response = await loginUser(data);
      if (response.data.success) {
        reset();
        localStorage.setItem("authToken", response.data.authToken);
        setStatus(STATUSES.IDLE);
        navigate("/");
        navigate(0)
      }
    } catch (error) {
      setStatus(STATUSES.ERROR);
      setResponseMessage(error.response.data.errors[0].msg);
      setTimeout(() => {
        setResponseMessage("");
        setStatus(STATUSES.IDLE);
      }, 3000);
    }
  };
  return (
    <Stack
      minHeight="100vh"
      alignItems="center"
      justifyContent="center"
      gap="3rem"
      sx={{ textAlign: "center" }}
    >
     <AlertComp status={status} responseMessage={responseMessage} />
      <Typography variant="h2">Login</Typography>
      <Stack
        component="form"
        noValidate
        onSubmit={handleSubmit(submitForm)}
        gap="1rem"
        minWidth="20rem"
      >
        <SimpleInput
          error={errors.email ? true : false}
          name="email"
          type="email"
          placeholder="Email"
          errorMessage={errors.email?.message}
          handleChange={handleInputChange}
          otherProps={{
            ...register("email"),
          }}
        />
        <SimpleInput
          error={errors.password ? true : false}
          name="password"
          type="password"
          placeholder="Password"
          errorMessage={errors.password?.message}
          handleChange={handleInputChange}
          otherProps={{
            ...register("password"),
          }}
        />
        <BtnPrimary btnText="Login" type="submit" status={status} />
        <Box
          sx={{
            display: "flex",
            justifyContent: "right",
            gap: "0.5rem",
            alignItems: "center",
          }}
        >
          <Typography>Donot have an account?</Typography>
          <Link to="/sign-up">Sign Up</Link>
        </Box>
      </Stack>
    </Stack>
  );
};

export default Login;
