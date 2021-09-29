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
import './styles/style.css';

const notifications = [
    {id: 1, from: 'admin', title: 'Approved', message: 'You are approved for vendor'},
    {id: 2, from: 'vendor', title: 'Approved', message: 'You are approved for vendor'},
    {id: 3, from: 'deliveryBoy', title: 'Approved', message: 'You are approved for vendor'},
    {id: 4, from: 'partner', title: 'Approved', message: 'You are approved for vendor'},
];

const wishList = [
    {id: 1, name: 'Burger', price: 10},
    {id: 2, name: 'Sandwich', price: 5},
    {id: 3, name: 'Pizza', price: 8},
    {id: 4, name: 'Steak', price: 15},
];

const favorites = [
    {id: 1, name: 'De Foodies', type: 'restaurant'},
    {id: 3, name: 'Pizza', price: 8, type: 'food'},
    {id: 2, name: 'Mc Donalds', type: 'restaurant'},
    {id: 4, name: 'Steak', price: 15, type: 'food'},
]

const notificationIcons = [
    {type: 'admin', icon: AdminPanelSettingsIcon, color: 'rgb(255, 0, 76)'},
    {type: 'vendor', icon: StorefrontIcon, color: 'rgb(0, 216, 180)'},
    {type: 'deliveryBoy', icon: DirectionsBikeIcon, color: 'rgb(0, 104, 240)'},
    {type: 'partner', icon: LocalShippingIcon, color: 'rgb(240, 128, 0)'},
];

const Index = () => {
    return (
        <div className="user-right-bar">
            <div className="user-notification user-right-bar-section">
                <h5>Notifications <NotificationsNoneIcon style={{fontSize: '18px'}} /></h5>
                <div className="notifications">
                    {
                        notifications.map((notification) => (
                            <div className="notification">
                                <div className="notification-icon">
                                    {notificationIcons.map((icon) => {
                                        if(icon.type === notification.from)
                                            return <icon.icon style={{fontSize: '15px', color: `${icon.color}`}} />
                                        else
                                            return null
                                    })}
                                </div>
                                <div className="notification-col-2">
                                    <h6>{notification.title}</h6>
                                    <p>{notification.message.slice(0, 30)}</p>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
            <div className="user-wishlist user-right-bar-section">
                <h5>Wishlist <ListAltIcon style={{fontSize: '18px'}}/> </h5>
                <div className="user-wishlist-list RBList">
                    {
                        wishList.map((item) => (
                            <div className="wish-item">
                                <FastfoodIcon style={{fontSize: '15px', color: 'rgb(240, 128, 0)'}} />
                                <span>{item.name}</span>
                                <span> $ {item.price}</span>
                            </div>
                        ))
                    }
                </div>
            </div>

            <div className="user-favorites user-right-bar-section">
                <h5>Favorites <FavoriteIcon style={{fontSize: '18px'}}/> </h5>
                <div className="user-favorites-list RBList">
                    {favorites.map((favorite) => {
                        if(favorite.type === 'food')
                        {
                            return(
                                <div className="wish-item">
                                    <FastfoodIcon style={{fontSize: '15px', color: 'rgb(240, 128, 0)'}} />
                                    <span>{favorite.name}</span>
                                    <span> $ {favorite.price}</span>
                                </div>
                            )
                        }
                        else
                        {
                            return(
                                <div className="favorite-hotel">
                                    <RestaurantIcon style={{fontSize: '15px', color: 'rgb(255, 0, 76)'}} />
                                    <span>{favorite.name}</span>
                                </div>
                            )
                        }
                    })}
                </div>
            </div>
        </div>
    )
}

export default Index
