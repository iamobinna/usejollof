import './styles/style.css';
import { useState, useEffect } from 'react';
import store from '../../../static/images/store.jpg';
import ImageInContainer from '../../../components/imageInContainer';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import StorefrontIcon from '@mui/icons-material/Storefront';
import DetailsIcon from '@mui/icons-material/Details';
import DeleteIcon from '@mui/icons-material/Delete';
import ShareIcon from '@mui/icons-material/Share';
import CancelIcon from '@mui/icons-material/Cancel';
import {TextField }from '@mui/material';
import {getVendor} from '../../../services/axios/vendor';


const AddBranch = ({id, setID}) => {
    if(!id)
    {
        return null;
    }

    return(
        <div className="pop-up-container">
            <div className="pop-up card">
                <CancelIcon className='close-btn' onClick = {() => setID(null)} />
                <div className="pop-up-upper">
                    <div className="pop-up-col1 vendor-store-add-branch">
                        <TextField
                            id="outlined-basic"
                            size="small"
                            label="Name"
                            variant="outlined"
                        />
                        <TextField
                            id="outlined-basic"
                            size="small"
                            label="Location"
                            variant="outlined"
                        />
                        <TextField
                            id="outlined-basic"
                            size="small"
                            label="Description"
                            variant="outlined"
                            multiline
                            rows={3}
                        />
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
                        <h4 className="button-text" style={{position: 'relative'}} >Share</h4>
                        <ShareIcon className='button-icon' style={{position: 'relative'}}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

const Index = () => {
    const [id, setID] = useState(null);
    const [data, setData] = useState(null);

    const clickHandler = (id) => {
        setID(id);
    }

    const fetch = async () => {
        const _data = await getVendor();
        if(_data)
        {
            setData(_data);
            console.log(_data);
        }
    }

    useEffect(() => {
        fetch();
    },[])

    return (
        <div className="vendor-store">
            <AddBranch id={id} setID={setID} />
            <div className="vendor-store-upper">
                <div className="vendor-store-image box">
                    <ImageInContainer imageSrc={store} />
                </div>
                <div className="vendor-store-details card">
                    <div className="vendor-store-col1">
                        <h5><StorefrontIcon/> Name</h5>
                        <h5><LocationOnIcon/> Location</h5>
                        <h5><DetailsIcon/> Description</h5>
                    </div>
                    <div className="vendor-store-col1">
                        <span>{data?.name}</span>
                        <span>{data?.location.address}</span>
                        <span>{data?.description}</span>
                    </div>
                </div>
            </div>
            <div className="vendor-store-branches">
                <h3>Branches 
                    <div className='button button-2 vendor-store-btn' onClick={clickHandler}>
                        <h4 className="button-text">Add Branch</h4>
                        <AccountTreeIcon className='button-icon' style={{color:'#ff0458'}}/>
                    </div> 
                </h3>
                <div className="vendor-store-branch card">
                    <div className="vendor-store-col1">
                        <h5><StorefrontIcon/> Name</h5>
                        <h5><LocationOnIcon/> Location</h5>
                        <h5><DetailsIcon/> Description</h5>
                    </div>
                    <div className="vendor-store-col1">
                        <span>De Foodies</span>
                        <span>Malir Town</span>
                        <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid sed deleniti.</span>
                    </div>
                    <div className="vendor-store-branch-image box ">
                        <ImageInContainer imageSrc={store} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Index;
