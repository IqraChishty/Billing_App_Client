import {
  Box,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const SimpleInput = (props) => {
  const {
    error,
    name,
    errorMessage,
    placeholder,
    type,
    handleChange,
    otherProps,
    adornmentEnd
  } = props;
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((prev) => !prev);
  return (
    <Box sx={{maxWidth: '100%'}}>
      <TextField
        {...otherProps}
        type={showPassword ? "text" : `${type}`}
        id={name}
        name={name}
        fullWidth
        color="primary"
        error={error}
        placeholder={placeholder}
        onChange={handleChange}
        InputProps={{
          endAdornment: (
            <>
              {type === "password" && (
                <InputAdornment position="end">
                  <IconButton onClick={handleClickShowPassword} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              )}
              {adornmentEnd}
            </>
          ),
        }}
      />
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

export default SimpleInput;
