import React, {useEffect, useState, Fragment} from "react";
import Profile from '../profile';
import History from '../History';
import Schedule from '../schedule';
import Settings from '../Settings';
import Wallet from '../Wallet';
import Home from '../home';
import Addresses from '../Addresses';
import SearchIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField';
import ImageInContainer from '../../../components/imageInContainer';
import { getAllFoods, getFoodsLike } from "../../../services/axios/food";
import Autocomplete from '@mui/material/Autocomplete';
import './styles/style.css';
import { URL } from "../../../urls";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import CategoryIcon from '@mui/icons-material/Category';
import FoodBankIcon from '@mui/icons-material/FoodBank';
import { createOrder } from "../../../services/axios/order";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import { getLocations } from "../../../services/axios/location";
import GoogleMap from "../../../components/GoogleMap";

const PopUp = ({food, setFood, orderNow, orderPlaced, setOrderPlaced}) => {

    const [qty, setQty] = useState(1);
    const [location, setLocation] = useState();
    const [_location, _setLocation] = useState();
    const [options, setOptions] = useState([]);
    const [eLocation, setELocation] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetch = async () => {
        const data = await getLocations();
        if(data)
        {
            setOptions(data);
        }
    }

    useEffect(() => {
        fetch();
    }, []);

    useEffect(() => {
        if(_location){
            setELocation(_location);
        }
    }, [_location])

    return(
        <div className="card-container">
            <div className="card">
                {
                    (loading && !orderPlaced) &&
                    <span>Sending offer</span>                    
                }
                {
                    (loading && orderPlaced) &&
                    <>
                        <span>{orderPlaced}</span>
                        <Button variant='outlined' onClick={() => {setFood(null); setOrderPlaced(null)}} >Great !</Button>
                    </>
                }
                {
                    !loading && <>
                    <TextField value={qty} onChange={e => setQty(e.target.value)} id="outlined-basic" type='number' size='small' label={`How many ${food.food.name} you want to order?`} variant="outlined" />
                    <FormControl fullWidth>
                        <InputLabel size='small' id="demo-simple-select-label">Your locations</InputLabel>
                        <Select
                        labelId="demo-simple-select-label"
                        size='small'
                        id="demo-simple-select"
                        value={location}
                        label="Your locations"
                        onChange={e => {setLocation(e.target.value); setELocation(e.target.value)}}
                        >
                            {
                                options.map((option) => (
                                    <MenuItem value={option.location} >{option.location.address}</MenuItem>
                                    ))
                                }
                        </Select>
                    </FormControl>
                    {/* <Button variant='outlined' > Add new location </Button> */}
                    <GoogleMap setLocation={_setLocation} eLocation={eLocation.latLng} />
                    <span>Total: $ {qty * food.food.price}</span>
                    <span>Will be delivered to: {eLocation?.address}</span>
                    
                    <TextField id="outlined-basic" type='number' size='small' label='Card Number (beta)' variant="outlined" />
                    
                    <div className="flex" style={{marginTop: '20px'}} >
                        <Button variant='outlined' onClick={() => {orderNow(food, qty, eLocation); setLoading(true)}} >Confirm order</Button>
                        <Button variant='outlined' onClick={() => setFood(null)} >Cancel</Button>
                    </div>
                </>
            }
            </div>
        </div>
    )
}

const Index = ({currentIndex, user}) => {
    const tabs = [
        {id: 0, component: Home, name: 'Home', to: '/' },
        {id: 1, component: Profile, name: 'Profile', to: '/account' },
        {id: 2, component: Wallet, name: 'Wallet', to: '/wallet' },
        {id: 3, component: Addresses, name: 'Manage Addresses',  to: '/manage-address' },
        {id: 4, component: Schedule, name: 'Schedule',  to: '/ongoing-orders' },
        {id: 5, component: History, name: 'History',  to: '/history' },
        {id: 6, component: Settings, name: 'Settings', to: '/settings' },
    ];

    const [foods, setFoods] = useState([]);
    const [value, setValue] = useState();
    const [inputValue, setInputValue] = useState('');
    const [focused, setFocused] = useState(false);
    const [searching, setSearching] = useState(false);
    const [searchData, setSearchData] = useState(null);
    const [foodId, setFoodId] = useState(null);
    const [orderPlaced, setOrderPlaced] = useState(null);

    const fetch = async () => {
        const data = await getAllFoods();
        if(data){
            setFoods(data);
            console.log(data);
        }
    }

    useEffect(() => {
        fetch();
    }, []);

    useEffect(() => {
        console.log('search data', searchData);
    }, [searchData]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSearching(true);
        let data = await getFoodsLike(value?.name);
        if(data){
            setSearchData(data);
        }
    }

    const orderNow = async (food, qty, location) => {
        const userData = JSON.parse(localStorage.getItem('userData'));
        console.log(food);
        const order = {
            vendor: food.details.email,
            user: userData.user.email,
            cost: food.food.price * qty,
            location,
            products: {foodId: food.food, qty: qty},
        };
        const data = await createOrder(order);
        if(data)
        {
            setOrderPlaced('Order Placed')
            console.log(data);
        }
        else{
            setOrderPlaced('There was some error');
        }
    }

    return (
        <div className="user-dashboard-main">
            {tabs.map((tab) => {
                if (tab.id === currentIndex) {
                    return (
                    <>
                        <div className="user-upper">
                            <h1>{tab.name}</h1>
                            <form onSubmit={handleSubmit} className="user-search-bar2">
                                {/* <input type="text" placeholder='Search' /> */}
                                <Autocomplete
                                    size='small'
                                    disablePortal
                                    id="combo-box-demo"
                                    value={value}
                                    onChange={(event, newValue) => {
                                    setValue(newValue);
                                    }}
                                    inputValue={inputValue}
                                    onInputChange={(event, newInputValue) => {
                                    setInputValue(newInputValue);
                                    }}
                                    options={foods}
                                    getOptionLabel={option => option.name}
                                    sx={{width: '100%'}}
                                    onFocus={() => setFocused(true)}
                                    onBlur={() => setFocused(false)}
                                    renderInput={(params) => <TextField required {...params} label="Search Food" />}
                                />
                                <button type='submit' className="search-icon">
                                    <SearchIcon/>
                                </button>
                            </form>

                        </div>
                        {
                            searching &&
                            <div className="search-tab card">
                                <h3>Results</h3>
                                {
                                    searchData?
                                    <div className="searched-foods">    
                                        {
                                            searchData?.map((food) => (
                                                <div className="outer">
                                                    <div className="searched-food">
                                                        <div className="texts">
                                                            <span className='flex' ><FastfoodIcon/> {food.food.name}</span>
                                                            <span className='flex' ><AccessTimeIcon/> {food.food.time} minutes </span>
                                                            <span className='flex' ><AttachMoneyIcon/> {food.food.price}</span>
                                                            <span className='flex' ><FoodBankIcon/> {food.details.name}</span>
                                                            <span className='flex' ><CategoryIcon/> {food.food.category}</span>
                                                            <span className='flex' ><LocationOnIcon/> {food?.details?.location.address}</span>
                                                        </div>
                                                        <div className="searched-food-img">
                                                            <ImageInContainer imageSrc={`${URL}/uploads/${food.food.pictures[0]}`} />
                                                        </div>
                                                    </div>
                                                    <Button onClick={() => setFoodId(food)} style={{marginTop: '20px'}} variant='outlined' >ORDER NOW</Button>
                                                </div>
                                            ))
                                        }
                                    </div>
                                    :
                                    <span>No data found</span>
                                }
                                <Button onClick={() => {setSearchData(null); setSearching(false)}} style={{marginTop: '30px'}} variant='outlined' >Close</Button>
                            </div>
                        }
                        {
                            (focused || searching) &&
                            <div className="search-active"></div>
                        }
                        {
                            foodId && <PopUp orderPlaced={orderPlaced} setOrderPlaced={setOrderPlaced} orderNow={orderNow} setFood={setFoodId} food = {foodId} />

                        }
                        <tab.component user={user} />
                    </>
                    );
                } else return null;
            })}
        </div>
    );
};

export default Index;
