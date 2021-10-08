import { useState } from "react";
import StorefrontIcon from '@mui/icons-material/Storefront';
import PaymentsIcon from '@mui/icons-material/Payments';
import Tooltip from "@mui/material/Tooltip";
import { openInAppLink } from "../../../services/openLinks";
import LogoutIcon from '@mui/icons-material/Logout';
import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining';
import InsightsIcon from '@mui/icons-material/Insights';
import "./styles/style.css";

const Index = ({currentIndex, setCurrentIndex}) => {

    const tabs = [
        {id: 0 , icon: StorefrontIcon, name: "Store Setup", color: 'rgb(0, 158, 66)'},
        {id: 1 , icon: DeliveryDiningIcon, name: "Fleet Management", color: 'rgb(0, 140, 158)'},
        {id: 2 , icon: InsightsIcon, name: "Insights", color: 'rgb(233, 37, 2)'},
        {id: 3 , icon: PaymentsIcon, name: "Payout Request", color: 'rgb(105, 1, 91)'},
    ]

    return (
        <div className="user-left-bar">
            {console.log(currentIndex)}
            {
                tabs.map((tab) => (
                    <Tooltip title={tab.name} onClick={() => { setCurrentIndex(tab.id)}} >
                        <div className={`left-bar-icon ${tab.id === currentIndex && 'left-bar-icon-active'} `}>
                            <div className="icon-bar" style={{background: `${tab.color}`}} ></div>
                            <tab.icon style={{color: `${tab.color}`}} className='LB-icon' />
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
