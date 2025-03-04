import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette:{
    primary:{
        main:'#000000',
        dark:'#0f1014'        
    },
    secondary:{
        main:"#2a2c30"
    },
    text:{
        primary:'#ffffff',
        secondary:'#2a2c30'
    },
    background:{
        paper:'black',
        default:'black',
    },
    divider:'#2a2c30',
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 500,
      fontSize: "48px",
      lineHeight: 1.2,
    },
    h2: {
      fontWeight: 500,
      fontSize: "40px",
      lineHeight: 1.25,
    },
    h3: {
      fontWeight: 500,
      fontSize: "32px",
      lineHeight: 1.3,
    },
    h4: {
      fontWeight: 500,
      fontSize: "28px",
      lineHeight: 1.35,
    },
    h5: {
      fontWeight: 500,
      fontSize: "24px",
      lineHeight: 1.5,
    },
    h6: {
      fontWeight: 500,
      fontSize: "16px",
      lineHeight: 1.45,
    },
    body1: {
      fontWeight: 400,
      fontSize: "16px",
      lineHeight: 1.5,
    },
    body2: {
      fontWeight: 400,
      fontSize: "14px",
      lineHeight: 1.5,
      color:'grey'
    },
    button: {
      fontWeight: 400,
      fontSize: "14px",
      fontStyle: "normal",
      textTransform: "none",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: "#2a2c30",
          borderRadius: "12px",
          "&:hover": {
            backgroundColor: "#232528",
          },
          "&.Mui-disabled": {
            backgroundColor: "#2a2c30",
            color: "white",
            opacity: 0.5,
          },
        },
        outlined:{
          borderRadius: "12px",
          border:'1px solid #2a2c30',
          backgroundColor:'transparent',
          color:'white'
        },
        text:{
          backgroundColor:'transparent',
          color:'white'
        },
      },
    },
    MuiIconButton:{
      styleOverrides:{
        root:{
          backgroundColor: "#2a2c30",
          color:'white',
          "&:hover": {
            backgroundColor: "#232528",
          },
        }
      }
    }
  },
});

export default theme;