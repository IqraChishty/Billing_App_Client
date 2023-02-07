import * as yup from "yup";
export const registerSchema = yup.object().shape({
  name: yup.string().required("This field is required"),
  email: yup
    .string()
    .required("This field is required")
    .email("Use a valid email format"),
  password: yup
    .string()
    .required("This field is required")
    .min(5, "Use minimum 5 characters")
    .matches(/\d/, "Use atleast 1 digit"),
  confirmPassword: yup
    .string()
    .required("This field is required")
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});
export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .required("This field is required")
    .email("Use a valid email format"),
  password: yup.string().required("This field is required"),
});
export const slabSchema = yup.object().shape({
  s1: yup.number().min(1,'Amount must be greater than 0').required("This field is required"),
  s2: yup.number().min(1,'Amount must be greater than 0').required("This field is required"),
  s3: yup.number().min(1,'Amount must be greater than 0').required("This field is required"),
  s4: yup.number().min(1,'Amount must be greater than 0').required("This field is required"),
});
export const rateSchema = yup.object().shape({
  unitsConsumed: yup.number().min(0,'Units must be positive').required("This field is required"),
  month: yup.string().required("This field is required"),
  year: yup.number().min(1,'Invalid year value').required("This field is required").test('len', 'Must be exactly 4 digits', (val) => { if(val) return val.toString().length === 4; }),
  slab: yup.object().required("This field is required")
});
