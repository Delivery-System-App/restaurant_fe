import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";

const Navmenu = ({ open, width, onClose, children }) => {
  const classes = makeStyles((theme) => ({
    drawerPaper: {
      width,
    },
    drawer: {
      [theme.breakpoints.up("sm")]: {
        width: width,
        flexShrink: 0,
      },
    },
  }))();

  return (
    <nav className={classes.drawer}>
      {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
      <Hidden smUp implementation="css">
        <Drawer
          variant="temporary"
          open={open}
          onClose={onClose}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          {children}
        </Drawer>
      </Hidden>
      <Hidden xsDown implementation="css">
        <Drawer
          classes={{
            paper: classes.drawerPaper,
          }}
          variant="permanent"
          open
        >
          {children}
        </Drawer>
      </Hidden>
    </nav>
  );
};

Navmenu.propTypes = {
  open: PropTypes.bool.isRequired,
  width: PropTypes.number.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Navmenu;
