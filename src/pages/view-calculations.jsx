import {
  Box,
  CircularProgress,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import SouthIcon from "@mui/icons-material/South";
import NorthIcon from "@mui/icons-material/North";
import { BtnPrimary, Chart, SelectInput, ViewBillDetails } from "../components";
import { STATUSES } from "../services/requests";
import { getAllRates } from "../services/api-calls";
import { useNavigate } from "react-router-dom";
import { monthArray } from "../utils/helper";

const ViewCalculations = () => {
  let navigate = useNavigate();
  const [status, setStatus] = useState(STATUSES.IDLE);
  const [allRates, setAllRates] = useState([]);
  const [currMonthRates, setCurrMonthRates] = useState(0);
  const [prevMonthRates, setPrevMonthRates] = useState(0);
  const [percentDiff, setPercentDiff] = useState(0);
  const [selectedBill, setSelectedBill] = useState("");

  const getData = async () => {
    setStatus(STATUSES.LOADING);
    try {
      let response = await getAllRates();
      // console.log(response.data.userRates);
      if (response.data.success) {
        setAllRates(response.data.userRates);
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

  useEffect(() => {
    if (allRates.length === 0) {
      return;
    }

    let currentMonth = Number(new Date().getMonth());
    let currentYear = Number(new Date().getFullYear());
    let currentMonthRates = allRates.filter((data) => {
      return (
        data.billedMonth.year === Number(currentYear) &&
        data.billedMonth.month === Number(currentMonth) - 1
      );
    });

    let previousMonth = currentMonth === 1 ? 12 : currentMonth - 1;
    let previousMonthYear = currentMonth === 1 ? currentYear - 1 : currentYear;
    let previousMonthRates = allRates.filter((data) => {
      return (
        data.billedMonth.year === previousMonthYear &&
        data.billedMonth.month === previousMonth - 1
      );
    });

    setCurrMonthRates(currentMonthRates);
    setPrevMonthRates(previousMonthRates);
    let diff = 0;

    if (
      // Only calculate if all the values are available
      previousMonthRates.length !== 0 &&
      previousMonthRates[0]?.totalRate !== 0 &&
      currentMonthRates.length !== 0
    ) {
      diff =
        ((currentMonthRates[0]?.totalRate - previousMonthRates[0]?.totalRate) /
          previousMonthRates[0]?.totalRate) *
        100;
    } else {
      // If current month is present and previous is not available, simply return current month rates assuming prev to b 0.
      // If current is not available, then check if the previous is available or not. If previous is also not available return 0, else return -100 assuming current rate to be 0
      diff =
        currentMonthRates.length !== 0
          ? currentMonthRates[0]?.totalRate
          : previousMonthRates.length !== 0
          ? -previousMonthRates[0]?.totalRate
          : 0;
    }

    setPercentDiff(diff.toFixed(2));

    // console.log("current", currentMonthRates);
    // console.log("previous", previousMonthRates);
  }, [allRates]);

  return (
    <div>
      {status === STATUSES.LOADING || status === STATUSES.ERROR ? (
        <Stack minHeight="100vh" alignItems="center" justifyContent="center">
          {status === STATUSES.LOADING && <CircularProgress />}
          {status === STATUSES.ERROR && <div>Something went wrong :(</div>}
        </Stack>
      ) : (
        <Stack
          minHeight="100vh"
          alignItems="center"
          justifyContent="center"
          gap="3rem"
          sx={{ textAlign: "center", padding: "5rem 0" }}
        >
          <Typography variant="h3" sx={{ textTransform: "uppercase" }}>
            <strong>Your Calculations</strong>
          </Typography>

          <Divider sx={{ width: "90vw" }} />

          <Box>
            <Stack alignItems={"center"} gap="0.5rem">
              <Typography variant="h5" my="1rem">
                Rate Difference W.R.T Previous Month
              </Typography>
              <Stack
                direction={"row"}
                alignItems="center"
                padding="1rem"
                sx={{ borderRadius: "1rem", border: "1px solid" }}
              >
                {percentDiff < 0 && <SouthIcon />}
                {percentDiff > 0 && <NorthIcon />}
                <Typography variant="h5" ml="1rem">
                  <strong>{Math.abs(percentDiff)} %</strong>
                </Typography>
              </Stack>
              <Typography>N/A values have assumed to be 0 or 1</Typography>
            </Stack>

            <Stack
              direction={{ xs: "column", tB: "row" }}
              gap="1rem"
              padding="2rem"
            >
              <ViewBillDetails
                title={
                  currMonthRates[0]
                    ? `Current Month Rates: Rs. ${currMonthRates[0]?.totalRate}`
                    : "Current Month Rates: N/A"
                }
                selectedSlab={currMonthRates[0]?.slabUsed.slabValues}
                month={currMonthRates[0]?.billedMonth.month}
                year={currMonthRates[0]?.billedMonth.year}
                unitsConsumed={currMonthRates[0]?.unitsConsumed}
              />
              <ViewBillDetails
                title={
                  prevMonthRates[0]
                    ? `Previous Month Rates: Rs. ${prevMonthRates[0]?.totalRate}`
                    : "Previous Month Rates: N/A"
                }
                selectedSlab={prevMonthRates[0]?.slabUsed.slabValues}
                month={prevMonthRates[0]?.billedMonth.month}
                year={prevMonthRates[0]?.billedMonth.year}
                unitsConsumed={prevMonthRates[0]?.unitsConsumed}
              />
            </Stack>
          </Box>

          <Divider sx={{ width: "90vw" }} />

          <Box>
            <Typography variant="h5" my="1rem">
              View Previous Bills
            </Typography>
            <SelectInput
              value={selectedBill}
              placeholder="Select bill date"
              handleChange={(event) => {
                setSelectedBill(event.target.value);
              }}
              options={allRates.map((rate) => {
                return {
                  value: rate,
                  label: `${monthArray[rate.billedMonth.month]} ${
                    rate.billedMonth.year
                  }`,
                };
              })}
            />
            <br />
            <ViewBillDetails
              title={
                selectedBill
                  ? `Previous Month Rates: Rs. ${selectedBill?.totalRate}`
                  : "Previous Month Rates: N/A"
              }
              selectedSlab={selectedBill?.slabUsed?.slabValues}
              month={selectedBill?.billedMonth?.month}
              year={selectedBill?.billedMonth?.year}
              unitsConsumed={selectedBill?.unitsConsumed}
            />
          </Box>

          <Divider sx={{ width: "90vw" }} />

          <Box>
            <Typography variant="h5" my="1rem">
              View Yearly Graphs
            </Typography>
            <Chart />
          </Box>

          <Stack gap="1rem" minWidth="20rem">
            <BtnPrimary
              btnText="Go back to profile"
              onClick={() => {
                navigate("/");
              }}
            />
          </Stack>
        </Stack>
      )}
    </div>
  );
};

export default ViewCalculations;
