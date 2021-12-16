import React, {useEffect, useState} from "react";
import SignIn from '../signIn';
import Map from '../maps';
import Orders from '../orders';
import './styles/style.css';
import {io} from 'socket.io-client';
import Alert from '@mui/material/Alert';
import { URL } from "../urls";
import {getOrder, getOrders} from '../services/order';
import {geolocated} from "react-geolocated";

const Index = ({currentIndex, user, setUser, coords, isGeolocationAvailable, isGeolocationEnabled}) => {

    const [currentOrder, setCurrentOrder] = useState(null);

    const [orders, setOrders] = useState([]);
    const [socket, setSocket] = useState(null);
    const [first, setFirst] = useState(true);
    const [_first, _setFirst] = useState(true);
    const [allowed, setAllowed] = useState(true);
    const [alert, setAlert] = useState(null);
    const [sending, setSending] = useState(false);
    const [resServer, setResServer] = useState(null)
    const [alreadyOnline, setAlreadyOnline] = useState(false);
    const [hasVehicle, setHasVehicle] = useState(true);
    const [location, setLocation] = useState({
        lat: null,
        lng: null
    });

    useEffect(() => {
        console.log('driverData', user);
        if(user && first){
            let vehicle = true;
            if(!user.user.vehicle){
                setHasVehicle(false);
                vehicle = false;
                setAlert('You have not been assigned a vehicle ask partner to assign you one')
            }
            console.log('vehicle',user.user)
            setFirst(false);
            if(vehicle){
                console.log('setting socket');
                if(!isGeolocationAvailable){setAlert(`Your device doesn't support geolocation`); setAllowed(false);}
                if(!isGeolocationEnabled){setAlert(`Allow location from settings`); setAllowed(false);}
                setSocket(io(URL,{
                    query: {token: user.auth_token}
                }));
                // trackLocation();
            }
        }

        if(!user){
            setFirst(true);
            if(socket !== null){
                console.log('logout fired');
                socket.disconnect();
                setSocket(null);
            }
        }
    }, [user]);

    useEffect(() => {
        if(socket){
            socket.emit('serverUpdateDriver', location);
        }
    }, [location]);

    useEffect(() => {
        if(coords?.latitude && coords?.longitude){
            console.log('coords', `(${coords.latitude},${coords.longitude})`);
            setLocation({lat: coords.latitude, lng: coords.longitude});
        }
    }, [coords]);

    const setSocketsAndFetchData = async () => {
        socket.emit('serverSaveDriver', {
            userID: user.user._id,
            location: {
                lat: null,
                lang: null,
            }
        });
    
        socket.on('already-online', () => {
            setAlert(`Your ID is logged in somewhere else, if it's not you contact admin`);
            setAlreadyOnline(true);
        });
    
        socket.on('get-delivery', async (order) => {
            console.log('order id',order);
            const data = await getOrder(order.orderID);
            if(data){
                if(orders){
                    setOrders(orders => [...orders, data]);
                }else{
                    setOrders(data);
                }
            }
        });

        socket.on('order-completed-response', (response) => {
            setSending(false);
            if(response.status === 200){
                setCurrentOrder(null);
                setResServer("Success");
            }else{
                setResServer("Error");
            }
        });
        _getOrders();
    }

    async function _getOrders(){
        const data = await getOrders();
        if(data){
            checkForOngoingOrders(data);
            setOrders(data);
        }
    }

    function checkForOngoingOrders(data){
        for (let i = 0; i < data.length; i++) {
            if (data[i].delivering === true){
                setCurrentOrder(data[i]);
                if(socket)
                    socket.emit('ongoing order');
                break;
            }
        }
    }

    useEffect(() => {
        if(socket && _first && allowed){
            _setFirst(false);
            setSocketsAndFetchData();
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
            {
                (alreadyOnline || !hasVehicle)? <></>:
                <>
                {
                    currentIndex === 1 && <Map socket={socket} setResServer={setResServer} setSending={setSending} sending={sending} resServer={resServer} socket={socket} location={location} currentOrder={currentOrder}/>
                }
                {
                    currentIndex === 0 && <Orders _getOrders={_getOrders()} socket={socket} currentOrder={currentOrder} setCurrentOrder={setCurrentOrder} orders={orders} setOrders={setOrders}/>
                }
                </> 
            }
        </div>
    );
};

export default geolocated({
    positionOptions:{
        enableHighAccuracy: true,
    },
    watchPosition: true,
    userDecisionTimeout: 5000,
})(Index);
