import { Box, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AlertComp, BtnPrimary, SimpleInput } from "../components";
import { registerSchema } from "../utils/input-validation-schemas";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { STATUSES } from "../services/requests";
import { registerUser } from "../services/api-calls";

const SignUp = () => {
  const [status, setStatus] = useState(STATUSES.IDLE);
  const [responseMessage, setResponseMessage] = useState("");

  const handleInputChange = (event) => {
    setStatus(STATUSES.IDLE);
    if (event.target.id === "name" && errors.name) {
      clearErrors("name");
    }
    if (event.target.id === "email" && errors.email) {
      clearErrors("email");
    }
    if (event.target.id === "password" && errors.password) {
      clearErrors("password");
    }
    if (event.target.id === "confirmPassword" && errors.confirmPassword) {
      clearErrors("confirmPassword");
    }
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    clearErrors,
  } = useForm({
    resolver: yupResolver(registerSchema),
  });

  const submitForm = async (data) => {
    setStatus(STATUSES.LOADING);
    try {
      let response = await registerUser(data);
      if (response.data.success) {
        setStatus(STATUSES.SUCCESS);
        setResponseMessage(response.data.msg);
        reset();
        setTimeout(() => {
          setResponseMessage("");
          setStatus(STATUSES.IDLE);
        }, 3000);
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
      <Typography variant="h2">Sign Up</Typography>
      <Stack
        id="signupForm"
        component="form"
        noValidate
        onSubmit={handleSubmit(submitForm)}
        gap="1rem"
        minWidth="20rem"
      >
        <SimpleInput
          error={errors.name ? true : false}
          name="name"
          type="text"
          placeholder="Name"
          errorMessage={errors.name?.message}
          handleChange={handleInputChange}
          otherProps={{
            ...register("name"),
          }}
        />
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
        <SimpleInput
          error={errors.confirmPassword ? true : false}
          name="confirmPassword"
          type="password"
          placeholder="Confirm password"
          errorMessage={errors.confirmPassword?.message}
          handleChange={handleInputChange}
          otherProps={{
            ...register("confirmPassword"),
          }}
        />
        <BtnPrimary btnText="Sign Up" type="submit" status={status} />
        <Box
          sx={{
            display: "flex",
            justifyContent: "right",
            gap: "0.5rem",
            alignItems: "center",
          }}
        >
          <Typography>Already have an account?</Typography>
          <Link to="/login">Login</Link>
        </Box>
      </Stack>
    </Stack>
  );
};

export default SignUp;
