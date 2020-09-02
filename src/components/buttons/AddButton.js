import React from "react";
import { Button, makeStyles } from "@material-ui/core";
import { A } from "hookrouter";
const useStyles = makeStyles((theme) => ({
  link: {
    textDecoration: "none",
    color: "inherit",
    cursor: "pointer",
  },
  container: {
    marginTop: "10px",
  },
}));
const Addbutton = ({ title, href }) => {
  const classes = useStyles();
  return (
    <Button variant="outlined" color="primary" style={{ outline: "none" }}>
      <A
        href={href}
        className={classes.link}
        style={{
          color: "#757de8",
          fontSize: "16px",
          textDecoration: "none",
          outline: "none",
        }}
      >
        {title}
      </A>
    </Button>
  );
};
export default Addbutton;
