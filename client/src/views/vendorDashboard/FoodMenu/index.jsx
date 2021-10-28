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
import { createFood } from '../../../services/axios/food';
import Alert from '@mui/material/Alert';
import { getCategories } from '../../../services/axios/category';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const PopUp = ({id, setID}) => {

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
                        <span>pictures</span>
                    </div>
                    <div className="pop-up-col1">
                        <span>Food Delivery</span>
                        <span>De Foodies</span>
                        <span>2021-10-5</span>
                       <div className="food-3-images">
                           <div className="food-3-image">
                            <ImageInContainer imageSrc={Burger} />
                           </div>
                           <div className="food-3-image">
                            <ImageInContainer imageSrc={Burger} />
                           </div>
                           <div className="food-3-image">
                            <ImageInContainer imageSrc={Burger} />
                           </div>
                       </div>
                    </div>
                </div>
                <div className="pop-up-buttons">
                    <div className='button button-hover'>
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

const AddPopUp = ({add, setAdd}) => {
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
    }, []);

    const imageHandler = (e) => {
        console.log('image handler');
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
            const data = await createFood(formData);
            if(data)
            {
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

    const clickHandler = (id) => {
        setID(id);
    }

    return (
        <div className="vendor-menu">
            <PopUp id={id} setID={setID} />
            <AddPopUp add={add} setAdd={setAdd} />
            <div className='button button-hover vendor-menu-add-btn' onClick={() => {setAdd(true)}} >
                <div className="button-bg" style={{background: 'blue', zIndex: '0'}} ></div>
                <h4 className="button-text" style={{position: 'relative'}} >Add</h4>
                <ShareIcon className='button-icon' style={{position: 'relative'}}/>
            </div>
            {/* 
                Fetch data from server about foods
            */}
            {
                foods.map((food) => (
                    <div className="vendor-menu-item vendor-food-item">
                        <div className="set">
                            <div className="vendor-store-details asd" >
                                <div className="vendor-store-col1">
                                    <h5>Name</h5>
                                    <h5>Price</h5>
                                    <h5>Prep time</h5>
                                </div>
                                <div className="vendor-store-col1">
                                    <span>Burger</span>
                                    <span>$ {20}</span>
                                    <span>2 hrs</span>
                                </div>
                            </div>
                        </div>
                        <div style={{position: 'relative'}} >
                            <div className="set box vendor-food-img">
                                <ImageInContainer imageSrc={Burger} />
                            </div>
                        </div>
                        <div className="set vendor-food-btns ">
                            <div className='button button-hover'>
                                <div className="button-bg delete-btn"></div>
                                <h4 className="button-text">Delete</h4>
                                <DeleteIcon className='button-icon'/>
                            </div>
                            <div className='button button-hover' onClick= {() => clickHandler(1)} >
                                <div className="button-bg detail-btn"></div>
                                <h4 className="button-text">Details</h4>
                                <DetailsIcon className='button-icon'/>
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default Index;
