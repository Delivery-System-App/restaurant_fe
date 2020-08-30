import React from "react";
import {
  Grid,
  Input,
  makeStyles,
  InputLabel,
  fade,
  InputAdornment,
  FormControl,
} from "@material-ui/core";
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
  root: {
    //width: "300px",
  },
}));
const SearchBar = ({ searchChange }) => {
  const classes = useStyles();
  return (
    <div className="w-full my-2 text-center">
      <FormControl className={classes.root}>
        <InputLabel htmlFor="input">Search</InputLabel>
        <Input
          id="input"
          onChange={searchChange}
          startAdornment={
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          }
        />
      </FormControl>
    </div>
  );
};
export default SearchBar;
