import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import Table from "./components/Table";
import { TextField, Typography } from "@mui/material";
import Drawer from "@mui/material/Drawer";

function App() {
  /*Using React Hook for current state and changed state
    for functional component*/
  const [loading, setLoading] = useState(false);
  const [docs, setdocs] = useState([]); //book data
  const [open, setOpen] = useState(false); //drawer
  const [search, setSearch] = useState([]); //search data
  const [authorDetails, setAuthorDetails] = useState([]); //author-details

  const fetchData = async (url) => {
    return await axios.get(url);
  };

  //Search Book Functionality to search book by title in Search Bar
  const handleSearch = async (e) => {
    setLoading(true);
    //condition to check if searched data is not empty
    if (e.key === "Enter" && e.target.value !== "") {
      const url = "https://openlibrary.org/search.json?title=" + e.target.value;
      const fetchResult = await axios.get(url);
      setdocs(fetchResult?.data?.docs);
      setSearch(e.target.value);
    }
    setLoading(false);
  };

  /*Drawer functionality
    -Initially drawer opening state is set to false
    and setAuthorDetails is set to empty array*/
  const toggleDrawer = () => {
    setOpen(false);
    setAuthorDetails([]);
  };

  //When clicked on Author,the side drawer shows up with Author Details fetched from API
  const getAuthorDetails = async (author) => {
    setOpen(true);
    const res = await fetchData(
      "https://openlibrary.org/search/authors.json?q=" + author
    );
    setAuthorDetails(res?.data?.docs);
  };
  // Styling the header and search bar using Typography
  return (
    <div>
      <div align="center">
        <Typography
          color="darkslateblue"
          fontFamily="fantasy"
          padding="10px"
          align="center"
          variant="h4"
        >
          BOOK LIBRARY
        </Typography>
        <TextField
          type="search"
          variant="outlined"
          label="Search by Title & Press Enter"
          onKeyPress={(e) => {
            handleSearch(e);
          }}
        />
      </div>

      {
        loading ? (
          <h2 align="center"> Loading....Please wait! </h2>
        ) : (
          <Table
            filteredData={docs}
            search={search}
            getAuthorDetails={getAuthorDetails}
          />
        ) //Loading is displayed untill the data is fetched
      }
      {open && (
        <Drawer //anchor defines the side of the Drawer i.e.,right
          anchor={"right"}
          open={open}
          onClose={() => {
            toggleDrawer();
          }}
        >
          <Typography
            color="darkslateblue"
            fontFamily="fantasy"
            variant="h4"
            align="center"
          >
            AUTHOR DETAILS
          </Typography>{" "}
          {/*Displaying Author Details in Drawer,styling using Typography */}
          {authorDetails.length > 0 ? (
            <>
              <Typography variant="h5" color="CaptionText" fontStyle="italic">
                Name: {authorDetails[0]?.name}
              </Typography>
              <Typography variant="h5" color="CaptionText" fontStyle="italic">
                Year-of-Birth: {authorDetails[0]?.birth_date}
              </Typography>
              <Typography variant="h5" color="CaptionText" fontStyle="italic">
                Year-of-Death: {authorDetails[0]?.death_date}
              </Typography>
              <Typography variant="h5" color="CaptionText" fontStyle="italic">
                Top-Work: {authorDetails[0]?.top_work}
              </Typography>
            </>
          ) : (
            <Typography>Getting Author Details ... </Typography>
          )}
        </Drawer>
      )}
    </div>
  );
}

export default App;
