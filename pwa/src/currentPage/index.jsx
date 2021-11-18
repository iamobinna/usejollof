import React, {useEffect, useState} from "react";
import SignIn from '../signIn';
import Map from '../maps';
import Orders from '../orders';
import './styles/style.css';
import {io} from 'socket.io-client';
import { URL } from "../urls";
// import {socket} from '../services/socket';


const Index = ({currentIndex, user, setUser}) => {

    const [socket, setSocket] = useState(null);
    const [first, setFirst] = useState(true);
    const [_first, _setFirst] = useState(true);
    const [geoID, setGeoID] = useState(null);
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
                error => console.log(error)
            );
            setGeoID(id);
        }

        if(!user || user === null){
            setFirst(true);
            if(geoID !== null)
                navigator.geolocation.clearWatch(geoID);
        }
    }, [user]);


    useEffect(() => {
        if(socket){
            socket.emit('serverUpdateDriver', location);
        }
    }, [location]);

    useEffect(() => {
        if(socket && _first){
            _setFirst(false);
            
            socket.emit('serverSaveDriver', {
                userID: user.user._id,
                location: {
                    lat: null,
                    lang: null,
                }
            })
        }
    }, [socket]);

    if(!user || user.user === null){
        return (
                <div className="delivery-main">
                    <SignIn user={user} setUser={setUser} />
            </div>
        )
    }

    return (
        <div className="delivery-main">
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
