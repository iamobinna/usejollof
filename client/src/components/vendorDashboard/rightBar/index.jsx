import {useState} from 'react';
import DirectionsBikeIcon from '@mui/icons-material/DirectionsBike';
import StorefrontIcon from '@mui/icons-material/Storefront';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ListAltIcon from '@mui/icons-material/ListAlt';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import EmojiFoodBeverageIcon from '@mui/icons-material/EmojiFoodBeverage';
import './styles/style.css';
import TextField from '@mui/material/TextField';

const orders = [
    {id: 1, item: 'Burger', from: 'City', price: 20},
    {id: 2, item: 'Pizza', from: 'City', price: 30},
    {id: 2, item: 'Pizza', from: 'City', price: 30},
    {id: 3, item: 'Sandwich', from: 'City', price: 10},
    {id: 4, item: 'Fries', from: 'City', price: 5},
    {id: 4, item: 'Fries', from: 'City', price: 5},
    {id: 5, item: 'Rice', from: 'City', price: 10},
];


const Index = () => {
    return (
        <div className="user-right-bar vB">
            <div className="vendor-right-message">
                <h5>Send Message <ChatBubbleIcon style={{fontSize: '18px'}}/> </h5>
                <div className="vendor-right-inputs">
                    <TextField
                        id="outlined-basic"
                        inputProps={{
                            style: { fontSize: 13, width: '80px' },
                        }}
                        InputLabelProps={{
                            style: { fontSize: 13 },
                        }}
                        size="small"
                        label="email"
                        type="email"
                        variant="outlined"
                    />
                    <TextField
                        id="outlined-basic"
                        inputProps={{
                            style: { fontSize: 13, width: '80px' },
                        }}
                        InputLabelProps={{
                            style: { fontSize: 13 },
                        }}
                        size="small"
                        label="message"
                        rows={4}
                        multiline
                        variant="outlined"
                    />
                </div>    
            </div>
            <div className="vendor-recent-order">
                <h5>Recent Orders <EmojiFoodBeverageIcon style={{fontSize: '18px'}} /> </h5>
                <div className="vendor-order-top">
                    <h5>Item</h5>
                    <h5>From</h5>
                    <h5>Price</h5>
                </div>
                <div className="os">
                    <div className="o1">
                        {
                            orders.map((order) => (
                                <span>{order.item}</span>
                            ))
                        }
                    </div>
                    <div className="o2">
                        {
                            orders.map((order) => (
                                <span>{order.from}</span>
                            ))
                        }
                    </div>
                    <div className="o3">
                        {
                            orders.map((order) => (
                                <span>{order.price}</span>
                            ))
                        }
                </div>
                </div>
            </div>

            <div className='button button-2' style={{justifyContent: 'space-between'}}>
                <h4 className="button-text">Coupon</h4>
                <ConfirmationNumberIcon className='button-icon' />
            </div>
        </div>
    );
}

export default Index
