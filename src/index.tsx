// @ts-nocheck
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthUser.context";

import { createTheme } from "@mui/material/styles";
import { deepPurple, orange } from "@mui/material/colors";
import { AppStateProvider } from "./contexts/AppState.context";

const theme = createTheme({
  palette: {
    primary: deepPurple,
    secondary: orange,
  },
});

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <AppStateProvider>
        <AuthProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </AuthProvider>
      </AppStateProvider>
    </ThemeProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
