import {React, useState, useEffect} from 'react';
import {Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ArrowBack from '@mui/icons-material/ArrowBack';
import Image from 'mui-image'


// import { Link } from "react-router-dom";
function ShowPage (props) {
  const location = useLocation()
  const data = location.state.data;
  const jsonURL = location.state.jsonURL;
  const [image, setImage] = useState('')
  useEffect(()=>{
    axios
      .get(jsonURL)
      .then(response => {
        setImage(response.data[0])
        })
  },[])
    return (
      <div>
        <AppBar position="relative" color="success">
            <Toolbar>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="open drawer"
                    sx={{ mr: 2 }}
                    component={Link}
                    to='/'
                >
                    <ArrowBack />
                </IconButton>
                <div>
                <Typography
                    variant="h6"
                    noWrap
                    component="div"
                    sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                >
                    Title : {data.title}
                </Typography>
                <Typography
                    variant="h6"
                    noWrap
                    component="div"
                    sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                >
                    Location : {data.location}
                </Typography>
                <Typography
                    variant="h6"
                    noWrap
                    component="div"
                    sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                >
                    Photographer : {data.photographer}
                </Typography>
                <Typography
                    variant="h6"
                    noWrap
                    component="div"
                    width="90vw"
                    sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                >
                    Description : {data.description}
                </Typography>
                <Typography
                    variant="h6"
                    noWrap
                    component="div"
                    width="90vw"
                    sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                >
                    Keywords : {Array.isArray(data.keywords) ? data.keywords.toString() : data.keywords}
                </Typography>
                <Typography
                    variant="h6"
                    noWrap
                    component="div"
                    sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                >
                    Date : {data.date_created}
                </Typography>
                </div>
            </Toolbar>
        </AppBar>
        <Image
          width="100%"
          src={image}
        />
      </div>
    )
}
export default ShowPage;