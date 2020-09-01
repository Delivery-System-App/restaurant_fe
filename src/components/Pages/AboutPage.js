import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Link from "@material-ui/core/Link";
import Footer from "../../Footer/Footer";
import useHeading from "./useHeading";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
  },
  main: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(2),
  },
}));

const AboutPage = () => {
  const classes = useStyles();
  useHeading("About");

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Container component="main" className={classes.main} maxWidth="sm">
        <Typography variant="h2" component="h1" gutterBottom>
          SKOSH
        </Typography>
        <Typography variant="h5" component="h2" gutterBottom>
          {"We aim to provide you the fast food delivery service."}
        </Typography>
        <Typography variant="body1">Help us serve you better</Typography>
      </Container>
      <Footer />
    </div>
  );
};
export default AboutPage;
