import { Box, MenuItem, Select, Typography } from "@mui/material";
import React from "react";

const SelectInput = (props) => {
  const {
    error,
    name,
    errorMessage,
    value,
    handleChange,
    otherProps,
    placeholder,
    options,
  } = props;

  return (
    <Box sx={{ maxWidth: "100%" }}>
      <Select
        {...otherProps}
        fullWidth
        id={name}
        name={name}
        value={value}
        error={error}
        onChange={handleChange}
        displayEmpty
        MenuProps={{ PaperProps: { sx: { maxHeight: '12rem' } } }}
      >
        <MenuItem value="">
          <em>{placeholder}</em>
        </MenuItem>
        {options?.map((option, index) => {
          return (
            <MenuItem key={index} value={option.value}>
              {option.label}
            </MenuItem>
          );
        })}
      </Select>

      {error && errorMessage !== (null || "") && (
        <Typography
          variant="body1"
          color="red"
          pl="0.5rem"
          mt="0.5rem"
          textAlign="left"
        >
          {errorMessage}
        </Typography>
      )}
    </Box>
  );
};

export default SelectInput;
