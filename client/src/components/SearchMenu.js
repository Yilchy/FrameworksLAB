import { Grid } from "@mui/material";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import React, { useState } from "react";
const SearchMenu = ({ onSearch }) => {
  const [title, setTitle] = useState("");

  const handleSearch = () => {
    const searchData = title;

    onSearch(searchData);
  };

  return (
    <Grid container direction="row" justifyContent="space-around" alignItems="">
      <TextField
        label="Назва"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <Button variant="contained" onClick={handleSearch}>
        Пошук
      </Button>
    </Grid>
  );
};

export default SearchMenu;
