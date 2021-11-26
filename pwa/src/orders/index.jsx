import React, {useState} from 'react';
import './styles/style.css';
import DiningIcon from '@mui/icons-material/Dining';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import PersonIcon from '@mui/icons-material/Person';
import ExploreIcon from '@mui/icons-material/Explore';
import Alert from '@mui/material/Alert';
import { updateOrder } from '../services/order';


const Index = ({orders, setOrders, currentOrder, setCurrentOrder, socket}) => {

    const open = (index) => {
        const isOpen = orders[index].open;
        let arr = [...orders];
        if(isOpen){
            arr[index].open = false;
            setOrders(arr);
            return;
        }

        for (let i = 0; i < arr.length; i++) {
            arr[i].open = false;
        }

        arr[index].open = true;
        setOrders(arr);
    }

    const startOrder = (index) => {
        if(currentOrder === null){
            //there are no orders
            setCurrentOrder(orders[index]);
            updateOrder({...orders[index], delivering: true});
            //remove driver from socket list
            if(socket){
                socket.emit('ongoing order');
            }
        }
    }

    return (
        <div className='delivery-boy-orders'>
            <h2>Orders</h2>
            {
                currentOrder? <Alert severity='info' >You have an ongoing order, swith to "On going order TAB"</Alert>:
                <>
                {
                    orders.map((order, index) => (
                        <div onClick={() => open(index)} className={`delivery-boy-order box ${order.open && 'delivery-boy-order-active'} `}>
                            <div className="flex">
                            {
                                order.toDeliver === 'Parcel'? 
                                <ShoppingBagIcon/>:
                                <DiningIcon/>
                            }
                                <span> {order.products.foodId.name} </span> 
                            </div>
                            <div className="flex">
                                <div className="flex">
                                    <LocationOnIcon/>
                                    <span> {order.vendorLocation.address} </span>
                                </div>
                                <ArrowRightAltIcon/>
                                <div className="flex">
                                    <LocationOnIcon style={{color: 'rgb(0, 128, 90)'}} />
                                    <span> {order.userLocation.address} </span>
                                </div>
                            </div>
                            <div className="flex">
                                <PersonIcon/>
                                <span> {order.user} </span>
                            </div>
                            <div className="delivery-order-button flex box" onClick={() => startOrder(index)} >
                                <ExploreIcon/>
                                <h5> Start Order </h5>
                            </div>
                        </div>
                    ))
                }
                </>
            }
        </div>
    )
}

export default Index
