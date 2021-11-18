import React, {useEffect, useState} from "react";
import SignIn from '../signIn';
import Map from '../maps';
import Orders from '../orders';
import './styles/style.css';
import {io} from 'socket.io-client';
import Alert from '@mui/material/Alert';
import { URL } from "../urls";
// import {socket} from '../services/socket';


const Index = ({currentIndex, user, setUser}) => {

    const [socket, setSocket] = useState(null);
    const [first, setFirst] = useState(true);
    const [_first, _setFirst] = useState(true);
    const [geoID, setGeoID] = useState(null);
    const [allowed, setAllowed] = useState(true);
    const [alert, setAlert] = useState(null);
    const [location, setLocation] = useState({
        lat: null,
        lng: null
    });

    const tabs = [
        // {id: 2, component: SignIn, name: 'Sign In', to: '/' },
        {id: 1, component: Map, name: 'On going', to: '/account' },
        {id: 0, component: Orders, name: 'Orders', to: '/wallet' }
    ];

    useEffect(() => {
        console.log('driverData', user);
        if(user && first){
            setFirst(false);
            setSocket(io(URL, {
                query: {token: user.auth_token}
            }));
            trackLocation();
            // if (navigator.geolocation) {
            //     navigator.permissions
            //       .query({ name: "geolocation" })
            //       .then(function (result) {
            //         if (result.state === "granted") {
            //           console.log(result.state);
            //           trackLocation();
            //           setAllowed(true);  
            //         } else if (result.state === "prompt") {
            //           console.log(result.state);
            //           setAllowed(true);
            //         } else if (result.state === "denied") {
            //           setAlert('Allow location from settings');
            //         }
            //         result.onchange = function () {
            //           console.log(result.state);
            //         };
            //       });
            //   } else {
            //       setAlert('Location cannot be shared from your device');
            //   }
        }

        if(!user || user === null){
            setFirst(true);
            if(geoID !== null)
                navigator.geolocation.clearWatch(geoID);
        }
    }, [user]);

    const trackLocation = () => {
        console.log('Setting navigator');
        const id = navigator.geolocation.watchPosition(
        data=> {
            setLocation(
            {
                lat: data.coords.latitude,
                lng: data.coords.longitude
            }
        )
        },
        error => {console.log(error); setAllowed(false); setAlert(error) }
        );
        setGeoID(id);
    }


    useEffect(() => {
        if(socket){
            socket.emit('serverUpdateDriver', location);
        }
    }, [location]);

    useEffect(() => {
        if(socket && _first && allowed){
            _setFirst(false);
            
            socket.emit('serverSaveDriver', {
                userID: user.user._id,
                location: {
                    lat: null,
                    lang: null,
                }
            })
        }
    }, [socket, allowed]);

    if(!user || user.user === null){
        return (
                <div className="delivery-main">
                    <SignIn user={user} setUser={setUser} />
            </div>
        )
    }

    return (
        <div className="delivery-main">
            {
                alert &&
                <Alert style={{marginBottom: '10px'}} severity="info">{alert}</Alert>
            }
            {tabs.map((tab) => {
                if (tab.id === currentIndex) {
                    return (
                    <>
                        <tab.component />
                    </>
                    );
                } else return null;
            })}
        </div>
    );
};

export default Index;
