import {useState, useRef, useEffect} from 'react';
import './styles/style.css';
import Burger from '../../../static/images/burger.jpeg';
import ImageInContainer from '../../../components/imageInContainer';
import DeleteIcon from '@mui/icons-material/Delete';
import DetailsIcon from '@mui/icons-material/Details';
import ShareIcon from '@mui/icons-material/Share';
import CancelIcon from '@mui/icons-material/Cancel';
import TextField from '@mui/material/TextField';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Button from '@mui/material/Button';
import { createFood, getFoods, getFood, deleteFood } from '../../../services/axios/food';
import Alert from '@mui/material/Alert';
import { getCategories } from '../../../services/axios/category';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { URL as _URL } from '../../../urls';

const PopUp = ({id, setID, _deleteFood}) => {

    const [food, setFood] = useState();
    const [category, setCategory] = useState('');
    const [options, setOptions] = useState([]);

    const fetch = async () => {
        const data = await getFood(id);
        const _data = await getCategories();
        setOptions(_data?.categories);
        if(data)
        {
            setFood(data);
        }
        console.log(data);
    }

    useEffect(() => {
        fetch();
    }, []);

    if(!id)
    {
        return null;
    }

    return(
        <div className="pop-up-container">
            <div className="pop-up box">
                <CancelIcon className='close-btn' onClick = {() => setID(null)} />
                <div className="pop-up-upper">
                    <div className="pop-up-col1">
                        <span>Name</span>
                        <span>Price</span>
                        <span>Preparation time</span>
                        <span>Category</span>
                        {/* <span>pictures</span> */}
                    </div>
                    <div className="pop-up-col1">
                        <span>{food?.name}</span>
                        <span>$ {food?.price}</span>
                        <span>{food?.time} min</span>
                        <FormControl fullWidth style={{minWidth: '200px'}} >
                            <InputLabel size='small' id="demo-simple-select-label">Select Category</InputLabel>
                            <Select
                                size='small'
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={category}
                                label="Select Category"
                                onChange={(e) =>  setCategory(e.target.value)}
                                >
                                {
                                    options.map((opt) => (
                                        <MenuItem value={opt} >{opt}</MenuItem>
                                    ))
                                }
                            </Select>
                        </FormControl>
                    </div>
                </div>
                    <div className="food-3-images">
                        {
                            food?.pictures?.map((img) => (
                                <div className="food-3-image">
                                    <ImageInContainer imageSrc={`${_URL}/uploads/${img}`} />
                                </div>
                            ))
                        }
                   </div>
                <div className="pop-up-buttons">
                    <div className='button button-hover' onClick={() => _deleteFood(food?._id)} >
                        <div className="button-bg" style={{background: 'red', zIndex: '0'}} ></div>
                        <h4 className="button-text" style={{position: 'relative'}}>Delete</h4>
                        <DeleteIcon className='button-icon' style={{position: 'relative'}}/>
                    </div>
                    <div className='button button-hover'>
                        <div className="button-bg" style={{background: 'blue', zIndex: '0'}} ></div>
                        <h4 className="button-text" style={{position: 'relative'}} >Edit</h4>
                        <ShareIcon className='button-icon' style={{position: 'relative'}}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

const AddPopUp = ({add, setAdd, foods, setFoods}) => {
    const [sendProfileImage, setSendProfileImage] = useState([]);
    const [profileImage, setProfileImage] = useState([]);
    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState(null);
    const imageRef = useRef(null);
    const [time, setTime] = useState('');
    const [price, setPrice] = useState('');
    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [options, setOptions] = useState([]);

    const handleClick = () => {
        imageRef.current.click();
    }

    const fetch = async() => {
        const data = await getCategories();
        setOptions(data?.categories);
    }

    useEffect(() => {
        fetch();
        setAlert(null);
    }, []);

    const imageHandler = (e) => {
        if(e.target.files[0])
        {
            let images = [e.target.files];
            let _images = [];
            let toSend = [];
            for (let i = 0; i < images[0].length && i < 3; i++) {
                _images.push(URL.createObjectURL(images[0][i]));
                toSend.push(images[0][i]);
            }
            setProfileImage(_images);
            setSendProfileImage(toSend);
        }
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        if(loading === true)
        {
            setAlert('Wait for Server Response');
        }
        else if(sendProfileImage.length > 0)
        {
            setLoading(true);
            var formData = new FormData();
            for (const key of Object.keys(sendProfileImage)){
                formData.append('images', sendProfileImage[key]);
            }
            formData.append('name', name);
            formData.append('price', price);
            formData.append('time', time);
            formData.append('category', category);
            const userData = JSON.parse(localStorage.getItem('userData'));
            formData.append('vendor', userData.user.email);
            const data = await createFood(formData);
            if(data)
            {
                setFoods(foods => [...foods, data]);
                setLoading(false);
                setAlert('Food Added');
            }else{
                setLoading(false);
                setAlert('There was some error');
            }
        }else{
            setAlert('Add images');
        }
    }

    if(add === false)
    {
        return null;
    }

    return(
        <div className="pop-up-container">
            <form className="pop-up box" onSubmit={submitHandler} >
                {
                    alert &&
                    <Alert severity="warning">{alert}</Alert>
                }
                <CancelIcon className='close-btn' onClick = {() => setAdd(false)} />
                <div className="pop-up-upper">
                    <div className="pop-up-col1" style={{rowGap: '10px'}} >
                        <TextField
                            value={name}
                            onChange = {(e) => {
                                setName(e.target.value)
                            }}
                            id="outlined-basic"
                            inputProps={{
                                style: { fontSize: 13},
                            }}
                            InputLabelProps={{
                                style: { fontSize: 13 },
                            }}
                            size="small"
                            required
                            label="name"
                            variant="outlined"
                        />
                        <TextField
                            value={price}
                            onChange = {(e) => {
                                setPrice(e.target.value)
                            }}
                            id="outlined-basic"
                            inputProps={{
                                style: { fontSize: 13},
                            }}
                            required
                            InputLabelProps={{
                                style: { fontSize: 13 },
                            }}
                            size="small"
                            label="price ($)"
                            type="number"
                            variant="outlined"
                        />
                        <TextField
                            id="outlined-basic"
                            value={time}
                            onChange = {(e) => {
                                setTime(e.target.value)
                            }}
                            inputProps={{
                                style: { fontSize: 13},
                            }}
                            required
                            InputLabelProps={{
                                style: { fontSize: 13 },
                            }}
                            size="small"
                            label="Preparation time (minutes) "
                            type="number"
                            variant="outlined"
                        />
                        <FormControl fullWidth>
                            <InputLabel size='small' id="demo-simple-select-label">Select Category</InputLabel>
                            <Select
                                size='small'
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={category}
                                label="Select Category"
                                required
                                onChange={(e) =>  setCategory(e.target.value)}
                                >
                                {
                                    options.map((opt) => (
                                        <MenuItem value={opt} >{opt}</MenuItem>
                                    ))
                                }
                            </Select>
                        </FormControl>
                    <ImageList sx={{ width: 500 }} cols={3} rowHeight={164}>
                    {profileImage.map((item, index) => (
                        <ImageListItem key={item}>
                        <img
                            src={item}
                            srcSet={item}
                            alt={index}
                            loading="lazy"
                        />
                        </ImageListItem>
                    ))}
                    </ImageList>
                    <input style={{display: 'none'}} ref={imageRef} multiple onChange={imageHandler} type="file" name="" id="" accept="image/*" />
                    <Button onClick={() => handleClick()} variant='outlined' >add Images</Button>
                    </div>
                </div>
                <div className="pop-up-buttons">
                    <button style={{
                        outline: 'none',
                        border: 'none'
                    }} type='submit' className='button button-hover'>
                        <div className="button-bg" style={{background: 'red', zIndex: '0'}} ></div>
                        <h4 className="button-text" style={{position: 'relative'}}>Add</h4>
                        <DeleteIcon className='button-icon' style={{position: 'relative'}}/>
                    </button>
                </div>
            </form>
        </div>
    )
}

const Index = () => {

    const [id, setID] = useState(null);
    const [add, setAdd] = useState(false);
    const [foods, setFoods] = useState([]);

    const fetch = async () => {
        const data = await getFoods();
        if(data)
        {
            setFoods(data);
        }
    }

    useEffect(() => {
        fetch();
    }, [])

    const clickHandler = (id) => {
        setID(id);
    }

    const _deleteFood = async (id) => {
        const data = await deleteFood(id);
        if(data){
            const arr = foods.filter(food => food._id !== id);
            setFoods(arr);
        }
    }

    return (
        <div className="vendor-menu">
            {
                id &&
                <PopUp id={id} _deleteFood={_deleteFood} setID={setID} />
            }
            {
                add &&
                <AddPopUp add={add} foods={foods} setFoods={setFoods} setAdd={setAdd} />
            }
            <div className='button button-hover vendor-menu-add-btn' onClick={() => {setAdd(true)}} >
                <div className="button-bg" style={{background: 'blue', zIndex: '0'}} ></div>
                <h4 className="button-text" style={{position: 'relative'}} >Add</h4>
                <ShareIcon className='button-icon' style={{position: 'relative'}}/>
            </div>
            {/* 
                Fetch data from server about foods
            */}
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                rowGap: '90px'
            }} >
                {
                    foods.map((food) => (
                        <div key={food._id} style={{
                            boxShadow: '0 0 10px 1px rgba(0,0,0,0.15)'
                        }} className="vendor-menu-item vendor-food-item">
                            <div className="set">
                                <div className="vendor-store-details asd" >
                                    <div className="vendor-store-col1">
                                        <h5>Name</h5>
                                        <h5>Price</h5>
                                        <h5>Prep time</h5>
                                    </div>
                                    <div className="vendor-store-col1">
                                        <span>{food.name}</span>
                                        <span>$ {food.price}</span>
                                        <span>{food.time} min</span>
                                    </div>
                                </div>
                            </div>
                            <div style={{position: 'relative'}} >
                                <div className="set box vendor-food-img">
                                    <ImageInContainer imageSrc={`${_URL}/uploads/${food.pictures[0]}`} />
                                </div>
                            </div>
                            <div className="set vendor-food-btns ">
                                <div className='button button-hover'>
                                    <div className="button-bg delete-btn" onClick={() => _deleteFood(food._id)} ></div>
                                    <h4 className="button-text">Delete</h4>
                                    <DeleteIcon className='button-icon'/>
                                </div>
                                <div className='button button-hover' onClick= {() => clickHandler(food._id)} >
                                    <div className="button-bg detail-btn"></div>
                                    <h4 className="button-text">Details</h4>
                                    <DetailsIcon className='button-icon'/>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Index;
