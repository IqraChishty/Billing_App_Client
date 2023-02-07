import React, { useEffect, useState } from "react";

import { Stack, Typography, useMediaQuery } from "@mui/material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { useTheme } from "@mui/material/styles";
import { getChartData } from "../../services/api-calls";
import { STATUSES } from "../../services/requests";
import { SelectInput } from "../../components";

const Chart = () => {
  const theme = useTheme();
  const small = useMediaQuery(theme.breakpoints.up("sm"));
  const mL = useMediaQuery(theme.breakpoints.up("mL"));
  const [data, setData] = useState([]);
  const [status, setStatus] = useState(STATUSES.IDLE);
  const [graphYearData, setGraphYearData] = useState("");

  const getData = async () => {
    setStatus(STATUSES.LOADING);
    try {
      let response = await getChartData();
      // console.log(response.data.chartData);
      if (response.data.success) {
        setData(response.data.chartData);
        setStatus(STATUSES.SUCCESS);
      }
    } catch (error) {
      setStatus(STATUSES.ERROR);
      // console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Stack sx={{ maxWidth: "100vw" }} alignItems="center">
      <SelectInput
        value={graphYearData}
        placeholder="Select graph year"
        handleChange={(event) => {
          setGraphYearData(event.target.value);
        }}
        options={data.map((yearData) => {
          return {
            value: yearData.userRates,
            label: `${yearData.year}`,
          };
        })}
      />
      <br />
      <BarChart
        width={small ? 550 : mL ? 400 : 300}
        height={300}
        data={graphYearData}
        margin={{
          left: -25,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        {/* <XAxis dataKey="billedMonth.month" tick={renderCustomAxisTick} /> */}
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="Units" fill="#8884d8" />
        <Bar dataKey="Rates" fill="#82ca9d" />
      </BarChart>
    </Stack>
  );
};

export default Chart;
