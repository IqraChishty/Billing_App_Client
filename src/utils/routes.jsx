import {
  Home,
  SignUp,
  Login,
  Profile,
  CreateBill,
  CreateSlab,
  ViewCalculations,
  Error,
} from "../pages";

export const routes = [
  {
    name: "home",
    key: "home",
    path: "/",
    component: <Home />,
  },
  {
    name: "signup",
    key: "signup",
    path: "/sign-up",
    component: <SignUp />,
  },
  {
    name: "login",
    key: "login",
    path: "/login",
    component: <Login />,
  },
  {
    name: "error",
    key: "error",
    path: "*",
    component: <Error />,
  },
];
export const protectedRoutes = [
  {
    name: "profile",
    key: "profile",
    path: "/",
    component: <Profile />,
  },
  {
    name: "createBill",
    key: "createBill",
    path: "/create-bill",
    component: <CreateBill />,
  },
  {
    name: "createSlab",
    key: "createSlab",
    path: "/create-slab",
    component: <CreateSlab />,
  },
  {
    name: "viewCalculations",
    key: "viewCalculations",
    path: "/calculations",
    component: <ViewCalculations />,
  },
  {
    name: "error",
    key: "error",
    path: "*",
    component: <Error />,
  },
];
