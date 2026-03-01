import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import store from "./redux/store";
import { CustomThemeProvider } from "./ThemeContext";

import { GoogleOAuthProvider } from "@react-oauth/google";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <GoogleOAuthProvider clientId="9220965190-snnpddkuhauj4abc0dnai8l4022mbv7d.apps.googleusercontent.com">
      <CustomThemeProvider>
        <App />
      </CustomThemeProvider>
    </GoogleOAuthProvider>
  </Provider>
);
