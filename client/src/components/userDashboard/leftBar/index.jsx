import { useState } from "react";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import TimelineIcon from "@mui/icons-material/Timeline";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ScheduleIcon from "@mui/icons-material/Schedule";
import SettingsIcon from "@mui/icons-material/Settings";
import ShareIcon from "@mui/icons-material/Share";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import HomeIcon from "@mui/icons-material/Home";
import Tooltip from "@mui/material/Tooltip";
import { openInAppLink } from "../../../services/openLinks";
import "./styles/style.css";

const Index = ({currentIndex, setCurrentIndex}) => {

    const tabs = [
        {id: 0, name: 'Home', icon: HomeIcon, to: '/' },
        {id: 1, name: 'Account', icon: AccountCircleIcon, to: '/account' },
        {id: 2, name: 'Wallet', icon: AccountBalanceWalletIcon, to: '/wallet' },
        {id: 3, name: 'Manage Addresses', icon: LocationOnIcon, to: '/manage-address' },
        {id: 4, name: 'Ongoing orders', icon: ScheduleIcon, to: '/ongoing-orders' },
        {id: 5, name: 'History', icon: TimelineIcon, to: '/history' },
        {id: 6, name: 'Share with a friend', icon: ShareIcon, to: '/share-friend' },
        {id: 7, name: 'Settings', icon: SettingsIcon, to: '/settings' },
    ];

    return (
        <div className="user-left-bar">
            {console.log(currentIndex)}
            {
                tabs.map((tab) => (
                    <Tooltip title={tab.name} onClick={() => { setCurrentIndex(tab.id)}} >
                        <div className={`left-bar-icon ${tab.id === currentIndex && 'left-bar-icon-active'} `}>
                            <div className="icon-bar"></div>
                            <tab.icon/>
                        </div>
                    </Tooltip>
                ))
            }
        </div>
    );
};

export default Index;
