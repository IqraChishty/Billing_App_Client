import theme from "../../../theme/theme";

const Styles = {
  [theme.breakpoints.up("xs")]: {
    bgcolor: 'primary.main',
    color: 'text.secondary',
    textTransform: 'none',
    width: '100%',
    '&:hover':{
      bgcolor: 'secondary.main'
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
