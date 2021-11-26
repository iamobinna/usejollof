import React, {useState, useEffect} from 'react';
import './styles/style.css';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import RouteMap from '../components/distanceMap';
import { withScriptjs } from "react-google-maps";


const Index = ({location, currentOrder}) => {

    const [driverLocation, setDriverLocation] = useState('');
    const [startLocation, setStartLocation] = useState('');
    const [endLocation, setEndLocation] = useState('')
    
    useEffect(() => {
        setDriverLocation(location);
        setStartLocation(location);
        setEndLocation(currentOrder.vendorLocation.latLng);
    }, []);

    const startingLocation = () => {
        // setStartLocation(driverLocation);
        setEndLocation(currentOrder.vendorLocation.latLng);
    }

    const endingLocation = () => {
        // setStartLocation(currentOrder.vendorLocation.latLng);
        setEndLocation(currentOrder.userLocation.latLng);
    }

    const MapLoader = withScriptjs(RouteMap);
    return (
        <div className='delivery-boy-orders' >
            <div className="map box flex">
                {
                    console.log('redered')
                }
                <MapLoader
                    googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyD2N-yXRMJCZoNUsjJBlgwpH90NjjNWowI"
                    loadingElement={<div style={{ height: `100%`, overflow: 'hidden', borderRadius: '20px', position: 'relative' }} />}
                    startLocation={startLocation} endLocation={endLocation}
                />
                {/* </ScriptLoaded> */}
            </div>
            <div className="delivery-order-button flex box" onClick={() => startingLocation()} >
                <LocationOnIcon />
                <h5> Pickup Location </h5>
            </div>
            <div className="delivery-order-button flex box" onClick={() => endingLocation() } >
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
