import {useState} from 'react';
import './styles/style.css';
import Burger from '../../../static/images/burger.jpeg';
import ImageInContainer from '../../../components/imageInContainer';
import DeleteIcon from '@mui/icons-material/Delete';
import DetailsIcon from '@mui/icons-material/Details';
import ShareIcon from '@mui/icons-material/Share';
import CancelIcon from '@mui/icons-material/Cancel';
import TextField from '@mui/material/TextField';

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
                        <TextField
                            id="outlined-basic"
                            inputProps={{
                                style: { fontSize: 13},
                            }}
                            InputLabelProps={{
                                style: { fontSize: 13 },
                            }}
                            size="small"
                            label="name"
                            variant="outlined"
                        />
                        <TextField
                            id="outlined-basic"
                            inputProps={{
                                style: { fontSize: 13},
                            }}
                            InputLabelProps={{
                                style: { fontSize: 13 },
                            }}
                            size="small"
                            label="price"
                            type="number"
                            variant="outlined"
                        />
                        <TextField
                            id="outlined-basic"
                            inputProps={{
                                style: { fontSize: 13},
                            }}
                            InputLabelProps={{
                                style: { fontSize: 13 },
                            }}
                            size="small"
                            label="Preparation time"
                            type="number"
                            variant="outlined"
                        />
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

const Index = () => {

    const [id, setID] = useState(null);
    const [add, setAdd] = useState(false);

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
        </div>
    )
}

export default Index;
