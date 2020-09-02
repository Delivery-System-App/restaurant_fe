import React, { useEffect } from "react";
import Router from "./router/Router";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { changeTheme } from "./redux/actions";
import "./new.css";

function App() {
  const dispatch = useDispatch();

  const palletType = useSelector((state) => state.appState.theme);

  const theme = createMuiTheme({
    palette: {
      type: palletType,
    },
  });

  useEffect(() => {
    const themeValue = localStorage.getItem("theme");
    if (themeValue && themeValue !== palletType) {
      dispatch(changeTheme(themeValue));
    }
  });

  return (
    <ThemeProvider theme={theme}>
      <Router />
    </ThemeProvider>
  );
}

export default App;
