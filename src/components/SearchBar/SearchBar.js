import React from "react";
import {
  Input,
  InputLabel,
  InputAdornment,
  FormControl,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";

const SearchBar = ({ searchChange }) => {
  return (
    <div className="w-full my-2 text-center">
      <FormControl>
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
