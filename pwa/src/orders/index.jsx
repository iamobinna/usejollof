import React, {useState} from 'react';
import './styles/style.css';
import DiningIcon from '@mui/icons-material/Dining';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import PersonIcon from '@mui/icons-material/Person';
import ExploreIcon from '@mui/icons-material/Explore';

const Index = () => {

    const [orders, setOrders] = useState([
        {id: 0, open: false, toDeliver: 'Burger', from: 'Karachi', to: 'New York, Street 1', customer: 'Shah Fahad'},
        {id: 1, open: false, toDeliver: 'Parcel', from: 'Karachi', to: 'New York, Street 1', customer: 'Shah Fahad'},
        {id: 2, open: false, toDeliver: 'Pizza', from: 'Karachi', to: 'New York, Street 1', customer: 'Shah Fahad'},
        {id: 3, open: false, toDeliver: 'Parcel', from: 'Karachi', to: 'New York, Street 1', customer: 'Shah Fahad'},
    ])

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

    return (
        <div className='delivery-boy-orders'>
            <h2>Orders</h2>
            {
                orders.map((order, index) => (
                    <div onClick={() => open(index)} className={`delivery-boy-order box ${order.open && 'delivery-boy-order-active'} `}>
                        <div className="flex">
                        {
                            order.toDeliver === 'Parcel'? 
                            <ShoppingBagIcon/>:
                            <DiningIcon/>
                        }
                            <span> {order.toDeliver} </span> 
                        </div>
                        <div className="flex">
                            <div className="flex">
                                <LocationOnIcon/>
                                <span> {order.from} </span>
                            </div>
                            <ArrowRightAltIcon/>
                            <div className="flex">
                                <LocationOnIcon style={{color: 'rgb(0, 128, 90)'}} />
                                <span> {order.to} </span>
                            </div>
                        </div>
                        <div className="flex">
                            <PersonIcon/>
                            <span> {order.customer} </span>
                        </div>
                        <div className="delivery-order-button flex box">
                            <ExploreIcon/>
                            <h5> Start Order </h5>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default Index
