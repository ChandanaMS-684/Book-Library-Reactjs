import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import Table from "./components/Table";
import { TextField, Typography } from '@mui/material';
import Drawer from '@mui/material/Drawer';


function App() {
  const [loading, setLoading] = useState(true);
  const [docs, setdocs] = useState([]);    //book data
  const [open, setOpen] = useState(false); //drawer
  const [authorDetails, setAuthorDetails] = useState([]) //author-details 
  const fetchData = async (url) => {
    return await axios.get(url);
  }

  useEffect(async () => {
    const url = 'https://openlibrary.org/search.json?author=tolkien';
    const fetchResult = await axios.get(url);
    setdocs(fetchResult?.data?.docs)
    setLoading(false)
  }, [])

  const handleSearch = async (e) => {
    setLoading(true);
    if (e.target.value !== "") {
      const res = docs.filter((item) => item.title.toLowerCase().includes(e.target.value.toLowerCase()))
      setdocs(
        res
      )
    }
    else {
      const res = await fetchData('https://openlibrary.org/search.json?author=tolkien');
      setdocs(res?.data?.docs)
    }
    setLoading(false)
  }

  const toggleDrawer = () => {
    setOpen(false);
    setAuthorDetails([])
  }

  const getAuthorDetails = async (author) => {
    setOpen(true)
    const res = await fetchData("https://openlibrary.org/search/authors.json?q=" + author);
    setAuthorDetails(res?.data?.docs);
  }
  return (
    <div>
      <div align='center'>
        <Typography color="darkslateblue" padding="10px" align="center" variant='h3'>BOOK LIBRARY</Typography>
        <TextField type="search" variant='outlined' label="Search by Title..." onChange={(e) => {
          handleSearch(e)
        }} />
      </div>

      {loading ? <h2 align='center'> Loading Please wait .... </h2> : <Table filteredData={docs} getAuthorDetails={getAuthorDetails} />}
      {
        open && (<Drawer
          anchor={"right"}
          open={open}
          onClose={() => { toggleDrawer() }}
        >
          {/* <h1>AUTHOR DETAILS</h1> */}
          <Typography color="darkcyan" variant='h4' align="center">AUTHOR DETAILS</Typography>
          {
            authorDetails.length > 0 ? <>
              <Typography variant='h5'>Name: {authorDetails[0]?.name}</Typography>
              <Typography variant='h5'>Year-of-Birth: {authorDetails[0]?.birth_date}</Typography>
              <Typography variant='h5'>Year-of-Death: {authorDetails[0]?.death_date}</Typography>
              <Typography variant='h5'>Top-Work: {authorDetails[0]?.top_work}</Typography>
            </> : <Typography>Getting Author Details ... </Typography>
          }
        </Drawer>)
      }
    </div>
  );
}

export default App;
