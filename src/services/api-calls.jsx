import { getAuthToken } from "./auth";
import axios from "./base-api";
import requests from "./requests";

export const registerUser = async (data) => {
  const response = await axios.post(requests.REGISTER_USER, data);
  return response;
};
export const loginUser = async (data) => {
  const response = await axios.post(requests.LOGIN_USER, data);
  return response;
};
export const getUserDetails = async () => {
  const response = await axios.get(requests.GET_USER, {
    headers: {
      "auth-token": getAuthToken(),
    },
  });
  return response;
};
export const createSlab = async (data) => {
  const response = await axios.post(requests.CREATE_SLAB, data, {
    headers: {
      "auth-token": getAuthToken(),
    },
  });
  return response;
};
export const getAllUserSlabs = async () => {
  const response = await axios.get(requests.GET_USER_SLABS, {
    headers: {
      "auth-token": getAuthToken(),
    },
  });
  return response;
};
export const addCurrentRate = async (data) => {
  const response = await axios.post(requests.ADD_RATE, data, {
    headers: {
      "auth-token": getAuthToken(),
    },
  });
  return response;
};
export const getAllRates = async () => {
  const response = await axios.get(requests.GET_USER_RATES, {
    headers: {
      "auth-token": getAuthToken(),
    },
  });
  return response;
};
export const getChartData = async () => {
  const response = await axios.get(requests.GET_CHART_DATA, {
    headers: {
      "auth-token": getAuthToken(),
    },
  });
  return response;
};
