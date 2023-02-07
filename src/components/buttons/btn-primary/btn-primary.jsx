import { Button, CircularProgress } from "@mui/material";
import React from "react";
import { STATUSES } from "../../../services/requests";
import Styles from "./styles";

const BtnPrimary = (props) => {
  const { btnText, onClick, status, disabled, type } = props;
  return (
    <Button
      sx={Styles}
      onClick={onClick}
      disabled={status === STATUSES.LOADING || disabled}
      type={type}
    >
      {btnText}
      {status === STATUSES.LOADING && (
        <CircularProgress className="btn-spinner" size="1.3rem" />
      )}
    </Button>
  );
};

export default BtnPrimary;
