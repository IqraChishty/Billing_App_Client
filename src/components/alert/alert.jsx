import { Alert, Box } from "@mui/material";
import React from "react";
import { STATUSES } from "../../services/requests";

const AlertComp = (props) => {
  const { status, responseMessage } = props;
  return (
    <>
      {status === STATUSES.SUCCESS || status === STATUSES.ERROR ? (
        <Alert
          sx={{
            height: { xs: "4rem", tB: "3rem" },
            "& .MuiAlert-message": { padding: { xs: "11px 0", md: "8px 0" } },
          }}
          severity={status}
        >
          {responseMessage}
        </Alert>
      ) : (
        <Box sx={{ height: { xs: "4rem", tB: "3rem" } }}></Box>
      )}
    </>
  );
};

export default AlertComp;
