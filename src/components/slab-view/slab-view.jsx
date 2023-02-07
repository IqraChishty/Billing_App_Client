import { Stack, Typography } from "@mui/material";
import React from "react";
import { slabRange } from "../../utils/helper";

const SlabView = (props) => {
  const { selectedSlab, emptySlabMessage, headerVariant } = props;
  return (
    <Stack sx={{ width: "100%", padding: "2rem 0" }}>
      <Typography variant={headerVariant ? headerVariant : "h4"} mb="1rem">
        SLAB DETAILS
      </Typography>
      {selectedSlab.length === 0 ? (
        <div>{emptySlabMessage ? emptySlabMessage : "No Slab Selected"}</div>
      ) : (
        <table>
          <tbody>
            <tr>
              <th>Units</th>
              <th>Rs/unit</th>
            </tr>
            {slabRange.map((slab, index) => {
              return (
                <tr key={index}>
                  <td>{slab}</td>
                  <td>{selectedSlab.length > 0 ? selectedSlab[index] : ""}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </Stack>
  );
};

export default SlabView;
