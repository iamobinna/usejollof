import React from 'react';
import './styles/style.css';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';


const Index = () => {
    return (
        <div className='delivery-boy-orders' >
            <div className="map box flex">
                <h2>MAP</h2>
            </div>
            <div className="delivery-order-button flex box">
                <LocationOnIcon />
                <h5> Pickup Location </h5>
            </div>
            <div className="delivery-order-button flex box">
                <LocationOnIcon />
                <h5> Drop Location </h5>
            </div>
            <div className="delivery-order-button flex box red">
                <AccessTimeFilledIcon/>
                <h5> Posponed order </h5>
            </div>
        </div>
    );
}

export default Index
