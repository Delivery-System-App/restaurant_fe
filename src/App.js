import React, { useEffect } from "react";
import Router from "./router/Router";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { changeTheme } from "./redux/actions";

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

  console.log("App started");

  return (
    <ThemeProvider theme={theme}>
      <Router />
    </ThemeProvider>
  );
}

export default App;
