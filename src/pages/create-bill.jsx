import { Box, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  AlertComp,
  BtnPrimary,
  SelectInput,
  SimpleInput,
  SlabView,
} from "../components";
import { rateSchema } from "../utils/input-validation-schemas";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { STATUSES } from "../services/requests";
import { addCurrentRate, getAllUserSlabs } from "../services/api-calls";
import { monthOptions } from "../utils/helper";
import { useNavigate } from "react-router-dom";

const CreateBill = () => {
  const [status, setStatus] = useState(STATUSES.IDLE);
  const [responseMessage, setResponseMessage] = useState("");
  const [month, setMonth] = useState("");
  const [selectedSlab, setSelectedSlab] = useState("");
  const [slabs, setSlabs] = useState([]);
  let navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    clearErrors,
  } = useForm({
    resolver: yupResolver(rateSchema),
  });

  const handleInputChange = (event) => {
    setStatus(STATUSES.IDLE);

    if (event.target.id === "unitsConsumed" && errors.unitsConsumed) {
      clearErrors("unitsConsumed");
    }
    if (event.target.id === "year" && errors.year) {
      clearErrors("year");
    }
    if (event.target.name === "month") {
      clearErrors("month");
      setMonth(event.target.value);
    }
    if (event.target.name === "slab") {
      clearErrors("slab");
      setSelectedSlab(event.target.value);
    }
  };

  const getSlabs = async () => {
    try {
      let response = await getAllUserSlabs();
      if (response.data.success) {
        setSlabs(() => {
          return response.data.userSlabs.map((userSlab, index) => {
            return {
              value: userSlab,
              label: `(0-100: ${userSlab.slabValues[0]})(101-250: ${userSlab.slabValues[1]})(251-500: ${userSlab.slabValues[2]})(500> :${userSlab.slabValues[3]})`,
            };
          });
        });
      }
    } catch (error) {
      // console.log(error);
    }
  };

  useEffect(() => {
    getSlabs();
  }, []);

  const submitForm = async (data) => {
    let inputs = {
      unitsConsumed: data.unitsConsumed,
      slabUsed: {
        slabValues: data.slab.slabValues,
        slabId: data.slab.slabId,
      },
      billedMonth: {
        month: Number(data.month),
        year: data.year,
      },
    };

    setStatus(STATUSES.LOADING);
    try {
      let response = await addCurrentRate(inputs);
      if (response.data.success) {
        setStatus(STATUSES.SUCCESS);
        setResponseMessage(response.data.msg);
        reset();
        setMonth("");
        setSelectedSlab("");
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
      sx={{ textAlign: "center", padding: "2rem" }}
    >
      <AlertComp status={status} responseMessage={responseMessage} />
      <Typography variant="h2">Add New Bill</Typography>
      <Stack
        id="billForm"
        component="form"
        noValidate
        onSubmit={handleSubmit(submitForm)}
        gap="1rem"
        minWidth="20rem"
      >
        <SimpleInput
          error={errors.unitsConsumed ? true : false}
          name="unitsConsumed"
          type="text"
          placeholder="Enter total units consumed"
          errorMessage={
            errors.unitsConsumed
              ? errors.unitsConsumed.ref.value === ""
                ? "This field is required"
                : errors.unitsConsumed.type === "typeError"
                ? "Only digits are allowed"
                : errors.unitsConsumed.message
              : ""
          }
          adornmentEnd={<Box pl="1rem">Units</Box>}
          handleChange={handleInputChange}
          otherProps={{
            ...register("unitsConsumed"),
          }}
        />
        <Box
          sx={{
            maxWidth: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "start",
            gap: "0.5rem",
          }}
        >
          <Box sx={{ flexBasis: "50%" }}>
            <SelectInput
              error={errors.month ? true : false}
              name="month"
              value={month}
              placeholder="Select Month"
              errorMessage={errors.month?.message}
              handleChange={handleInputChange}
              otherProps={{
                ...register("month"),
              }}
              options={monthOptions}
            />
          </Box>
          <Box sx={{ flexBasis: "50%" }}>
            <SimpleInput
              error={errors.year ? true : false}
              name="year"
              type="text"
              placeholder="Enter Year"
              errorMessage={
                errors.year
                  ? errors.year.ref.value === ""
                    ? "This field is required"
                    : errors.year.type === "typeError"
                    ? "Only digits are allowed"
                    : errors.year.message
                  : ""
              }
              handleChange={handleInputChange}
              otherProps={{
                ...register("year"),
              }}
            />
          </Box>
        </Box>
        <SelectInput
          error={errors.slab ? true : false}
          name="slab"
          value={selectedSlab}
          placeholder="Select Slab"
          errorMessage={
            errors.slab
              ? errors.slab.ref.value === ""
                ? "This field is required"
                : errors.slab.type === "typeError"
                ? "Input must be an object"
                : errors.slab.message
              : ""
          }
          handleChange={handleInputChange}
          otherProps={{
            ...register("slab"),
          }}
          options={slabs}
        />
        <BtnPrimary btnText="Add Bill" type="submit" status={status} />
        <BtnPrimary
          btnText="Go back to profile"
          onClick={() => {
            navigate("/");
          }}
        ></BtnPrimary>
        <SlabView
          selectedSlab={
            selectedSlab.length === 0 ? [] : selectedSlab.slabValues
          }
        />
      </Stack>
    </Stack>
  );
};

export default CreateBill;
