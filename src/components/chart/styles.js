import theme from "../../theme/theme";
const Styles = {
  [theme.breakpoints.up("xs")]: {
    bgcolor: 'red',
    '& .btn-stepper':{
        textTransform: 'none',
        color: 'black'
    },
    '& .chart-stepper':{
        minWidth: '20rem'
    }
  },
};
export default Styles;
