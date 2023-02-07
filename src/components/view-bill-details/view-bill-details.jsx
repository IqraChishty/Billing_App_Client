import { Box, Typography } from "@mui/material";
import React from "react";
import { SlabView } from "../../components";
import { monthArray } from "../../utils/helper";

const ViewBillDetails = (props) => {
  const { title, selectedSlab, month, year, unitsConsumed } = props;

  return (
    <Box
      sx={{
        bgcolor: "primary.light",
        borderRadius: "1rem",
        padding: "1.2rem",
        color: "text.secondary",
        textAlign: "left",
      }}
    >
      <Typography variant="h5" mb="1rem">
        {title}
      </Typography>
      <Typography variant="h6">Month Name: {monthArray[month]}</Typography>
      <Typography variant="h6">Year: {year}</Typography>
      <Typography variant="h6">Units Consumed: {unitsConsumed}</Typography>
      <SlabView
        selectedSlab={selectedSlab ? selectedSlab : []}
        emptySlabMessage={"No data to show"}
        headerVariant="h6"
      />
    </Box>
  );
};

export default ViewBillDetails;
