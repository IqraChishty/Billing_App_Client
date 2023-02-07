import theme from "../../../theme/theme";

const Styles = {
  [theme.breakpoints.up("xs")]: {
    bgcolor: 'secondary.light',
    color: 'text.primary',
    textTransform: 'none',
    width: '100%',
    borderRadius: '1rem',
    '&:hover':{
      bgcolor: 'secondary.main',
      color: 'text.secondary',
    },
    '&:disabled':{
      bgcolor: 'neutral.disabled',
      color: 'text.secondary',
    },

    '& .btn-spinner':{
      size: '1rem',
      color: 'text.secondary',
      ml: '1rem',
    }
  },
};
export default Styles;
