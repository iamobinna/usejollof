import React, {useState, useEffect} from 'react';
import './styles/style.css';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import RouteMap from '../components/distanceMap';
import Alert from '@mui/material/Alert';
import { withScriptjs } from "react-google-maps";


const Index = ({location, currentOrder, sending, resServer, socket, setSending, setResServer}) => {

    const [driverLocation, setDriverLocation] = useState('');
    const [startLocation, setStartLocation] = useState('');
    const [endLocation, setEndLocation] = useState('');
    
    useEffect(() => {
        if(currentOrder === null){
            setResServer('No ongoing orders, switch tabs to start one')
            return;
        }
        setDriverLocation(location);
        setStartLocation(location);
        setEndLocation(currentOrder?.vendorLocation.latLng);
    }, [currentOrder]);

    const startingLocation = () => {
        setEndLocation(currentOrder?.vendorLocation.latLng);
    }

    const endingLocation = () => {
        setEndLocation(currentOrder?.userLocation.latLng);
    }

    const markOrderAsComplete = () => {
        setSending(true);
        setResServer('Sending');
        socket.emit('order-completed',{orderID: currentOrder._id, originLocation: driverLocation, vendorLocation: currentOrder.vendorLocation.latLng, userLocation: currentOrder.userLocation.latLng}); //check if this works
    }

    const MapLoader = withScriptjs(RouteMap);
    return (
        <div className='delivery-boy-orders' >
            {
                resServer && <Alert severity="info">{resServer}</Alert>
            }
            {
                !sending &&
                <>
                    {
                        currentOrder &&
                            <>
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
                            <div className="delivery-order-button flex box red" onClick={() => markOrderAsComplete()} >
                                <AccessTimeFilledIcon/>
                                <h5> Order Completed? </h5>
                            </div>
                            </>

                    }
                </>
            }
        </div>
    );
}

export default Index
