export const getAuthToken = () => {
  let authToken = localStorage.getItem("authToken")
    ? localStorage.getItem("authToken")
    : null;
  return authToken;
};
export const isAuthUser = () => {
  return getAuthToken() === null ? false : true;
};
export const logout = () => {
  localStorage.removeItem('authToken')
};
