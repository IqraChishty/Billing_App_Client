import { Box, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import { AlertComp, BtnPrimary, SimpleInput } from "../components";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { STATUSES } from "../services/requests";
import { slabSchema } from "../utils/input-validation-schemas";
import { createSlab } from "../services/api-calls";
import { slabRange } from "../utils/helper";
import { useNavigate } from "react-router-dom";

const CreateSlab = () => {
  const [status, setStatus] = useState(STATUSES.IDLE);
  const [responseMessage, setResponseMessage] = useState("");
  let navigate = useNavigate();

  const handleInputChange = (event) => {
    setStatus(STATUSES.IDLE);
    if (event.target.id === "s1" && errors.s1) {
      clearErrors("s1");
    }
    if (event.target.id === "s2" && errors.s2) {
      clearErrors("s2");
    }
    if (event.target.id === "s3" && errors.s3) {
      clearErrors("s3");
    }
    if (event.target.id === "s4" && errors.s4) {
      clearErrors("s4");
    }
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    clearErrors,
  } = useForm({
    resolver: yupResolver(slabSchema),
  });

  const submitForm = async (data) => {
    let slabValues = [data.s1, data.s2, data.s3, data.s4];

    setStatus(STATUSES.LOADING);
    try {
      let response = await createSlab({ slabValues });
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

  const slab = [
    { title: slabRange[0], name: "s1", error: errors.s1 },
    { title: slabRange[1], name: "s2", error: errors.s2 },
    { title: slabRange[2], name: "s3", error: errors.s3 },
    { title: slabRange[3], name: "s4", error: errors.s4 },
  ];
  return (
    <Stack
      minHeight="100vh"
      maxWidth="100vw"
      alignItems="center"
      justifyContent="center"
      gap="3rem"
      sx={{ textAlign: "center" }}
    >
      <AlertComp status={status} responseMessage={responseMessage} />
      <Typography variant="h2">Create New Slab</Typography>
      <Stack
        component="form"
        noValidate
        onSubmit={handleSubmit(submitForm)}
        gap="1rem"
        minWidth="20rem"
      >
        {slab.map((value, index) => {
          return (
            <div key={index}>
              <Typography>{value.title}</Typography>
              <SimpleInput
                error={value.error ? true : false}
                name={value.name}
                type="text"
                placeholder="Enter value"
                errorMessage={
                  value.error
                    ? value.error.ref.value === ""
                      ? "This field is required"
                      : value.error.type === "typeError"
                      ? "Only digits are allowed"
                      : value.error.message
                    : ""
                }
                adornmentEnd={<Box pl="1rem">Rs/Unit</Box>}
                handleChange={handleInputChange}
                otherProps={{
                  ...register(`${value.name}`),
                }}
              />
            </div>
          );
        })}
        <BtnPrimary btnText="Create Slab" type="submit" status={status} />
        <BtnPrimary
          btnText="Go back to profile"
          onClick={() => {
            navigate("/");
          }}
        />
      </Stack>
    </Stack>
  );
};

export default CreateSlab;
