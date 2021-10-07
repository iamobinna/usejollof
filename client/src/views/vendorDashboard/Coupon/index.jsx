import './styles/style.css';
import { useState } from 'react';
import InputMask from 'react-input-mask';
import TextField from '@mui/material/TextField';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import DateAdapter from '@mui/lab/AdapterMoment';
import ShareIcon from '@mui/icons-material/Share';
import CancelIcon from '@mui/icons-material/Cancel';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import ImageInContainer from '../../../components/imageInContainer';
import Burger from '../../../static/images/burger.jpeg';

const AddPopUp = ({add, setAdd}) => {
    

    if(add === false)
    {
        return null;
    }

    return(
        <div className="pop-up-container">
            <div className="pop-up box">
                <CancelIcon className='close-btn' onClick = {() => setAdd(false)} />
                <div className="pop-up-upper">
                    <div className="pop-up-col1" style={{rowGap: '10px'}} >
                        <InputMask
                            mask="aaa-999"
                            disabled={false}
                            maskChar=" "
                            >
                            {() => 
                                <TextField
                                id="outlined-basic"
                                inputProps={{
                                    style: { fontSize: 13},
                                }}
                                InputLabelProps={{
                                    style: { fontSize: 13 },
                                }}
                                size="small"
                                label="Coupon Code XXX-000"
                                variant="outlined"
                                />
                            }
                        </InputMask>
                        
                        <TextField
                            id="outlined-basic"
                            inputProps={{
                                style: { fontSize: 13},
                            }}
                            InputLabelProps={{
                                style: { fontSize: 13 },
                            }}
                            size="small"
                            label="discount"
                            type="number"
                            variant="outlined"
                        />
                        <LocalizationProvider dateAdapter={DateAdapter}>
                        <DatePicker
                            label="Valid till"
                            InputProps={{
                                style:{
                                    fontSize: '13px'
                                }
                            }}
                            renderInput={(params) => <TextField  size='small' {...params} />}
                        />
                        </LocalizationProvider>
                    {/* <div className="pop-up-col1"> multiple image selector
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
                       </div> */}
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

const DealPopUp = ({add, setAdd}) => {
    
    const [personName, setPersonName] = useState([]);
    if(add === false)
    {
        return null;
    }

    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
    PaperProps: {
        style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
        },
    },
    };

    const names = [
        'Oliver',
        'Van',
        'April',
        'Ralph',
        'Omar',
        'Carlos',
        'Miriam',
        'Bradley',
        'Virginia',
        'Kelly',
      ];

    const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a the stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };


    return(
        <div className="pop-up-container">
            <div className="pop-up box">
                <CancelIcon className='close-btn' onClick = {() => setAdd(false)} />
                <div className="pop-up-upper">
                    <div className="pop-up-col1" style={{rowGap: '10px'}} >                        
                        <TextField
                            id="outlined-basic"
                            inputProps={{
                                style: { fontSize: 13},
                            }}
                            InputLabelProps={{
                                style: { fontSize: 13 },
                            }}
                            size="small"
                            label="discount"
                            type="number"
                            variant="outlined"
                        />
                        <LocalizationProvider dateAdapter={DateAdapter}>
                        <DatePicker
                            label="Valid till"
                            InputProps={{
                                style:{
                                    fontSize: '13px'
                                }
                            }}
                            renderInput={(params) => <TextField  size='small' {...params} />}
                        />
                        </LocalizationProvider>
                        <FormControl>
                            <InputLabel size='small' id="demo-multiple-checkbox-label">Food items</InputLabel>
                            <Select
                                labelId="demo-multiple-checkbox-label"
                                id="demo-multiple-checkbox"
                                multiple
                                InputProps={{
                                    style:{
                                        fontSize: '13px'
                                    }
                                }}
                                value={personName}
                                onChange={handleChange}
                                input={<OutlinedInput size='small'  label="Food items" />}
                                renderValue={(selected) => selected.join(', ')}
                                MenuProps={MenuProps}
                                size='small'
                            >
                            {names.map((name) => (
                                <MenuItem key={name} value={name}>
                                    <Checkbox checked={personName.indexOf(name) > -1} />
                                    <div className="vendor-coupon-menu-item flex">
                                        <span>{name}</span>
                                        <span>$ {50}</span>
                                        <div className='box MU' style={{width: '40px', height: '40px'}} >
                                            <ImageInContainer imageSrc={Burger} />
                                        </div>
                                    </div>
                                    {/* <ListItemText primary={name} className='ListItemText'/> */}
                                </MenuItem>
                            ))}
                            </Select>
                        </FormControl>
                    </div>
                </div>
                <div className="pop-up-buttons">
                    <div className='button button-hover'>
                        <div className="button-bg" style={{background: 'red', zIndex: '0'}} ></div>
                        <h4 className="button-text" style={{position: 'relative'}}>Add</h4>
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


const Index = () => {

    const [coupons, setCoupons] = useState([
        {name: 'Launch', code: 'CXD-478', deadline: '1-2-2012', discount: 5},
        {name: 'Launch', code: 'CXD-478', deadline: '1-2-2012', discount: 5},
        {name: 'Launch', code: 'CXD-478', deadline: '1-2-2012', discount: 5},
        {name: 'Launch', code: 'CXD-478', deadline: '1-2-2012', discount: 5},
    ]);

    const [deals, setDeals] = useState([
        {name: 'Launch', price: 40, deadline: '1-2-2012', products: [12224, 151861, 5456431]},
        {name: 'Launch', price: 40, deadline: '1-2-2012', products: [12224, 151861, 5456431]},
        {name: 'Launch', price: 40, deadline: '1-2-2012', products: [12224, 151861, 5456431]},
    ]);

    const [add, setAdd] = useState(false);
    const [dealPopUp, setDealPopUp] = useState(false);

    return (
        <div>
            <AddPopUp add={add} setAdd={setAdd} />
            <DealPopUp add={dealPopUp} setAdd={setDealPopUp} />
            <h3>Coupons</h3>
            <div className='button button-hover fit' onClick={() => {setAdd(true)}}>
                <div className="button-bg" style={{background: 'green', zIndex: '0'}} ></div>
                <h4 className="button-text" style={{position: 'relative'}} >Add</h4>
                <AddCircleIcon className='button-icon' style={{position: 'relative'}}/>
            </div>
            <div className="card vendor-coupons fit">
            {
                coupons.map((coupon) => (
                    <div className="box flex vendor-coupon fit">
                        <div className="flex">
                            <h5>Name</h5>
                            <span>{coupon.name}</span>
                        </div>
                        <div className="flex">
                            <h5>Code</h5>
                            <span>{coupon.code}</span>
                        </div>
                        <div className="flex">
                            <h5>Discount</h5>
                            <span>{coupon.discount}</span>
                        </div>
                        <div className="flex">
                            <h5>Expiry</h5>
                            <span>{coupon.deadline}</span>
                        </div>
                        <CancelIcon className='close-btn close-btn-2' />
                    </div>
                ))
            }
            </div>
            <h3>Deals / Promos</h3>
            <div className='button button-hover fit' onClick={() => setDealPopUp(true)} >
                <div className="button-bg" style={{background: 'purple', zIndex: '0'}} ></div>
                <h4 className="button-text" style={{position: 'relative'}} >Add</h4>
                <AddCircleIcon className='button-icon' style={{position: 'relative'}}/>
            </div>
            <div className="vendor-deals">
                <div className="card vendor-coupons fit">
                    {deals.map((deal) => (
                        <div className="box flex vendor-coupon fit">
                            <div className="flex">
                                <h5>Name</h5>
                                <span>{deal.name}</span>
                            </div>
                            <div className="flex">
                                <h5>Price</h5>
                                <span>{deal.price}</span>
                            </div>
                            <div className="flex">
                                <h5>Deadline</h5>
                                <span>{deal.deadline}</span>
                            </div>
                            <CancelIcon className='close-btn close-btn-2' />
                            <RemoveRedEyeIcon onClick={() => setDealPopUp(true)} className='close-btn close-btn-2 close-btn-3' />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Index;
