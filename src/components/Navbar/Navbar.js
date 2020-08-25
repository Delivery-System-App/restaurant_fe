import React, { useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import Brightness4Icon from "@material-ui/icons/Brightness4";
import { A } from "hookrouter";
import { useSelector, useDispatch } from "react-redux";
import Navmenu from "./Navmenu";
import AppIcon from "../Common/AppIcon";
import { changeTheme } from "../../redux/actions";

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  drawerHead: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "70px",
  },
  icon: {
    marginRight: "10px",
  },
  appBar: {
    marginLeft: drawerWidth,
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
  },
  menuButton: {
    marginRight: 20,
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  appBarToolbar: {
    display: "flex",
    justifyContent: "space-between",
  },
  flex: {
    display: "flex",
    alignItems: "center",
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  link: {
    textDecoration: "none",
    color: "inherit",
  },
}));

const Navbar = ({ drawer, page }) => {
  const { heading, theme } = useSelector((state) => state.appState);
  const [mobileOpen, setMobileOpen] = useState(false);

  const classes = useStyles();
  const dispatch = useDispatch();

  const handleThemeChange = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    localStorage.setItem("theme", newTheme);
    dispatch(changeTheme(newTheme));
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const items = (
    <List>
      <ListItem className={classes.drawerHead}>
        <AppIcon className={classes.icon} />
        <Typography variant="h6" component="h1">
          {process.env.REACT_APP_NAME}
        </Typography>
      </ListItem>
      <Divider />
      {drawer.map((item, i) =>
        item.divider ? (
          <Divider key={i} />
        ) : item.path ? (
          <A key={i} href={item.path} className={classes.link}>
            <ListItem button>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          </A>
        ) : (
          <ListItem key={i} button onClick={item.fn}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        )
      )}
    </List>
  );

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar className={classes.appBarToolbar}>
          <div className={classes.flex}>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={handleDrawerToggle}
              className={classes.menuButton}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" noWrap>
              {heading}
            </Typography>
          </div>
          <div>
            <IconButton
              aria-label="Dark mode toggle"
              color="inherit"
              onClick={handleThemeChange}
              style={{ outline: "none" }}
            >
              <Brightness4Icon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      <Navmenu
        width={drawerWidth}
        open={mobileOpen}
        onClose={handleDrawerToggle}
      >
        {items}
      </Navmenu>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {page}
      </main>
    </div>
  );
};

Navbar.propTypes = {
  drawer: PropTypes.array.isRequired,
  page: PropTypes.element,
};

export default Navbar;
