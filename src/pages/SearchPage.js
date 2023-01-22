import {React, useState }from 'react';
import {Link} from 'react-router-dom'
import axios from 'axios';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import LoadingButton from '@mui/lab/LoadingButton';
import { Avatar } from '@mui/material';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import { SnackbarProvider, useSnackbar } from 'notistack';

//From MUI
const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  }));
  
const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));
  
const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: '12ch',
        '&:focus': {
          width: '20ch',
        },
      },
    },
}));

function SearchPageMain () {

    const [collections, setCollections] = useState([]);
    const [searchquery, setSearchquery] = useState('');
    const [startYear, setStartYear] = useState('');
    const [endYear, setEndYear] = useState('');
    const [loading, setLoading] = useState(false)

    const { enqueueSnackbar } = useSnackbar();

    const updateSearchquery = e => {
        setSearchquery(e.target.value);
    }

    const updateStartYear = e => {
        setStartYear(e.target.value);
    }

    const updateEndYear = e => {
        setEndYear(e.target.value);
    }
    //before get data, check validation
    const checkValid = () => {
        if(searchquery === ""){
            enqueueSnackbar('Input search word please', {variant : "error"});
            return 0;
        }
        else if(endYear < startYear){
            enqueueSnackbar('End year can not be eailer than Start year', {variant : 'error'})
            return 0;
        }
        else if(endYear < 0 || startYear < 0 || startYear > new Date().getFullYear() || endYear > new Date().getFullYear()){
            enqueueSnackbar('Put Year Correctly', {variant : 'error'})
            return 0;
        }
        else{
            console.log("fetch data")
            runSearch();
        }
    }
    //get data from API
    const runSearch = () => {
        let fetchURL = '';
        if(startYear === "" && endYear === "")
        fetchURL = `https://images-api.nasa.gov/search?q=${searchquery}&media_type=image`;
        else if(startYear === "")
        fetchURL = `https://images-api.nasa.gov/search?q=${searchquery}&year_end=${endYear}&media_type=image`;
        else if(endYear === "")
        fetchURL = `https://images-api.nasa.gov/search?q=${searchquery}&year_start=${startYear}&media_type=image`;
        else 
        fetchURL = `https://images-api.nasa.gov/search?q=${searchquery}&year_start=${startYear}&year_end=${endYear}&media_type=image`;

        setLoading(true)
        axios
            .get(
                fetchURL
            )
            .then(response => {
                console.log(fetchURL)
                setCollections(response.data.collection.items);
                setLoading(false);
                console.log(response.data.collection.items);
            })
            .catch(error => {
                console.log(
                "Encountered an error with fetching and parsing data",
                error
                );
            });
    }

    return (
      <div className=''>
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="fixed" color="success">
                <Toolbar>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="open drawer"
                    sx={{ mr: 2 }}
                >
                    <a href='https://www.nasa.gov/'>
                    <Avatar src='http://t0.gstatic.com/images?q=tbn:ANd9GcQ9u48pu-6IB2FnnYl_H-15le_g8Dkt5d5RN-VWiWIl_-dyJdaa'/>
                    </a>                
                </IconButton>
                <Typography
                    variant="h6"
                    noWrap
                    component="div"
                    sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                >
                    NASA Media Library
                </Typography>
                <Search>
                    <SearchIconWrapper>
                    <SearchIcon />
                    </SearchIconWrapper>
                    <StyledInputBase
                        type='number'
                        placeholder="Start Year"
                        inputProps={{ 'aria-label': 'startyear' }}
                        value={startYear}
                        onChange={updateStartYear}
                    />
                </Search>
                <Search>
                    <SearchIconWrapper>
                    <SearchIcon />
                    </SearchIconWrapper>
                    <StyledInputBase
                        placeholder="Search…"
                        inputProps={{ 'aria-label': 'search' }}
                        value={searchquery}
                        onChange={updateSearchquery}
                    />
                </Search>
                <Search>
                    <SearchIconWrapper>
                    <SearchIcon />
                    </SearchIconWrapper>
                    <StyledInputBase
                        type='number'
                        placeholder="End Year"
                        inputProps={{ 'aria-label': 'endyear' }}
                        value={endYear}
                        onChange={updateEndYear}
                    />
                </Search>
                <LoadingButton
                    size="large"
                    onClick={checkValid}
                    loading={loading}
                    loadingIndicator="Searching..."
                    variant="contained"
                >
                    <span>Search</span>
                </LoadingButton>
                </Toolbar>
            </AppBar>
        </Box>
        <div className=''>
            {
                collections.length>0 ?
                    <ImageList variant="masonry" cols={3} gap={8}>
                        {collections.map((collection, index) => (
                            <Link to="/show" state = {{data : collection.data[0], jsonURL : collection.href}}
                            key={index}
                            >
                                <ImageListItem>
                                    <img
                                        src={`${collection.links[0].href}?w=248&fit=crop&auto=format`}
                                        srcSet={`${collection.links[0].href}?w=248&fit=crop&auto=format&dpr=2 2x`}
                                        alt={collection.data[0].title}
                                        loading="lazy"
                                    />
                                    <ImageListItemBar
                                        title={collection.data[0].title}
                                    />
                                </ImageListItem>
                            </Link>
                        ))}
                    </ImageList>
                :
                <>Insert Keyword Please...</>
            }
        </div>
        <AppBar position="fixed" color="primary" sx={{ top: 'auto', bottom: 0 }}>
            <Toolbar>
                <a href='https://www.linkedin.com/in/avramenkoartem/'>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        sx={{ mr: 2 }}
                    >
                        <Avatar src='https://media.licdn.com/dms/image/D4E35AQFYArmVX7sGVQ/profile-framedphoto-shrink_200_200/0/1672002535825?e=1674741600&v=beta&t=2iw93Sy71v3ars37eWREcy8j6EyWuK2mhrd4ZI39LF4'/>
                    </IconButton>
                </a>
                <Typography
                    variant="h6"
                    noWrap
                    component="div"
                    sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                >
                    Avramenko Artem
                </Typography>
            </Toolbar>
        </AppBar>
      </div>
    )
}
export default function SearchPage(){
    return (
        <SnackbarProvider maxSnack={3}>
          <SearchPageMain />
        </SnackbarProvider>
      );
};
