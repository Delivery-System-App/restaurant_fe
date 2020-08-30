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
    <div className="w-full">
      <div className="my-2 w-3/4 md:w-1/3 lg:w-1/3 m-0 m-auto text-center">
        <FormControl style={{ width: "100%" }}>
          <InputLabel htmlFor="input">Search</InputLabel>
          <Input
            autoFocus={true}
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
    </div>
  );
};
export default SearchBar;
