import { useState } from "react";
import Tooltip from "@mui/material/Tooltip";
import { openInAppLink } from "../../../services/openLinks";
import LogoutIcon from '@mui/icons-material/Logout';
import "./styles/style.css";
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import FoodBankIcon from '@mui/icons-material/FoodBank';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import PaymentsIcon from '@mui/icons-material/Payments';
import PriceChangeIcon from '@mui/icons-material/PriceChange';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import CategoryIcon from '@mui/icons-material/Category';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';


const Index = ({currentIndex, setCurrentIndex}) => {

    const tabs = [
        { id: 0, name: "Manage Requests", icon: PeopleAltIcon , color: 'blue'},
        // { id: 1, name: "Manage Merchants", icon: FoodBankIcon , color: 'blue'},
        { id: 1, name: "Manage Orders", icon: ShoppingCartIcon , color: 'blue'},
        { id: 2, name: "Manage Timings", icon: AccessTimeFilledIcon , color: 'blue'},
        { id: 3, name: "Manage Accounts", icon: AccountTreeIcon , color: 'blue'},
        { id: 4, name: "Manage Payouts", icon: PaymentsIcon , color: 'blue'},
        { id: 5, name: "Manage Prices", icon: PriceChangeIcon , color: 'blue'},
        { id: 6, name: "Manage Wallets", icon: AccountBalanceWalletIcon , color: 'blue'},
        { id: 7, name: "Mannge Offers", icon: LocalOfferIcon , color: 'blue'},
        { id: 8, name: "Manage Categories", icon: CategoryIcon , color: 'blue'},
        { id: 9, name: "Manage Locations", icon: LocationOnIcon , color: 'blue'},
        { id: 10, name: "Commission", icon: MonetizationOnIcon , color: 'blue'},
    ];

    return (
        <div className="user-left-bar admin-left">
            {console.log(currentIndex)}
            {
                tabs.map((tab) => (
                    <Tooltip title={tab.name} onClick={() => { setCurrentIndex(tab.id)}} >
                        <div className={`left-bar-icon admin-icon ${tab.id === currentIndex && 'left-bar-icon-active'} `}>
                            <div className="icon-bar" style={{background: `${tab.color}`}} ></div>
                            <tab.icon style={{color: `${tab.color}`}} className='LB-icon ' />
                        </div>
                    </Tooltip>
                ))
            }
            <Tooltip title='logout' onClick={() => openInAppLink('/')} >
                <div className={`left-bar-icon left-bar-icon-active `}>
                    <LogoutIcon style={{color: `red`}} className='LB-icon' />
                </div>
            </Tooltip>
        </div>
    );
};

export default Index;
