import React, {useEffect, useState} from "react";
import SignIn from '../signIn';
import Map from '../maps';
import Orders from '../orders';
import './styles/style.css';
import {io} from 'socket.io-client';
import Alert from '@mui/material/Alert';
import { URL } from "../urls";
import {getOrder, getOrders} from '../services/order';
// import {socket} from '../services/socket';


const Index = ({currentIndex, user, setUser}) => {

    const [currentOrder, setCurrentOrder] = useState(null);

    const [orders, setOrders] = useState([]);
    const [socket, setSocket] = useState(null);
    const [first, setFirst] = useState(true);
    const [_first, _setFirst] = useState(true);
    const [geoID, setGeoID] = useState(null);
    const [allowed, setAllowed] = useState(true);
    const [alert, setAlert] = useState(null);
    const [alreadyOnline, setAlreadyOnline] = useState(false);
    const [hasVehicle, setHasVehicle] = useState(true);
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
            let vehicle = true;
            if(!user.user.vehicle || user.user.vehicle === null){
                setHasVehicle(false);
                vehicle = false;
                setAlert('You have not been assigned a vehicle ask partner to assign you one')
            }
            console.log('vehicle',user.user)
            setFirst(false);
            if(vehicle){
                console.log('setting socket');
                setSocket(io(URL,{
                    query: {token: user.auth_token}
                }));
                trackLocation();
            }
        }

        if(!user || user === null){
            setFirst(true);
            if(socket !== null){
                console.log('logout fired');
                socket.disconnect();
                setSocket(null);
            }
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
        error => {console.log(error); setAllowed(false); setAlert(error.message) }
        );
        setGeoID(id);
    }


    useEffect(() => {
        if(socket){
            socket.emit('serverUpdateDriver', location);
        }
    }, [location]);

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
                    currentIndex === 1 && <Map socket={socket} location={location} currentOrder={currentOrder}/>
                }
                {
                    currentIndex === 0 && <Orders socket={socket} currentOrder={currentOrder} setCurrentOrder={setCurrentOrder} orders={orders} setOrders={setOrders}/>
                }
                </> 
            }
        </div>
    );
};

export default Index;
