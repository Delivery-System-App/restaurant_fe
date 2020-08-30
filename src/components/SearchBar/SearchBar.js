import React from "react";
import { Grid, TextField, makeStyles, fade } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
const useStyles = makeStyles((theme) => ({
  searchContainer: {
    display: "flex",
    backgroundColor: fade(theme.palette.common.white, 0.15),
  },
  searchIcon: {
    alignSelf: "flex-end",
    marginBottom: "5px",
  },
  searchInput: {
    width: "100%",
    margin: "5px",
  },
}));
const SearchBar = ({ searchChange }) => {
  const classes = useStyles();
  return (
    <div className={classes.searchContainer} style={{ marginBottom: "10px" }}>
      <SearchIcon className={classes.searchIcon} />
      <TextField
        className={classes.searchInput}
        label="Search"
        variant="standard"
        onChange={searchChange}
      />
    </div>
  );
};
export default SearchBar;
