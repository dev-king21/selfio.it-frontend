import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ThemeProvider, createTheme } from '@mui/material/styles';

import { Provider } from "react-redux";
import store from "../redux/store";

let theme = createTheme({
  palette: {
    primary: {
      main: '#1BA9BE',
    },
    secondary: {
      main: '#edf2ff',
    },
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </Provider>
  )
}

export default MyApp
