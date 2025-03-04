import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { CssBaseline, ThemeProvider } from "@mui/material";
import theme from "./theme/theme.ts";
import { Provider } from "react-redux";
import { reduxStore } from "./redux/reduxStore.ts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline>
        <Provider store={reduxStore}>
          <App />
        </Provider>
      </CssBaseline>
    </ThemeProvider>
  </StrictMode>
);
