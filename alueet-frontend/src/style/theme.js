import { createTheme } from "@mui/material/styles";

const theme = createTheme({
	palette: {
		mode: "dark",
		primary: {
			main: "#1976d2", // secondary color for dark mode
		},
		secondary: {
		  main: "#1976d2", // secondary color for dark mode
		},
		error: {
		  main: "#d32f2f", // error color for dark mode
		},
		text: {
		  primary: "#000000", // text color for dark mode
		  secondary: "#bdbdbd", // secondary text color for dark mode
		},
		background: {
		  default: "#000000", // background color for dark mode
		},
  },
  palette: {
	mode: "light",
	primary: {
		main: "#1976d2", // secondary color for dark mode
	},
	secondary: {
	  main: "#1976d2", // secondary color for dark mode
	},
	error: {
	  main: "#d32f2f", // error color for dark mode
	},
	text: {
	  primary: "#000000", // text color for dark mode
	  secondary: "#bdbdbd", // secondary text color for dark mode
	},
	background: {
	  default: "#000000", // background color for dark mode
	},
},
  bgColor: {
	primary: '#e8e8e8',
	secondary: '#bdbdbd',
	default: '#f7f7f7',
	blue: '#4dabf5',
},
color: {
	primary: '#454545',
	secondary: '#666666',
	blue: '#1976d2',
	error: '#d32f2f',
},
text: {
	primary: '#e8e8e8',
	secondary: '#bdbdbd',
}

});

export default theme;