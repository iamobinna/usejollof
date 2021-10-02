import { useState } from "react";
import StorefrontIcon from '@mui/icons-material/Storefront';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import AssessmentIcon from '@mui/icons-material/Assessment';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import PaymentsIcon from '@mui/icons-material/Payments';
import Tooltip from "@mui/material/Tooltip";
import { openInAppLink } from "../../../services/openLinks";
import LogoutIcon from '@mui/icons-material/Logout';
import "./styles/style.css";

const Index = ({currentIndex, setCurrentIndex}) => {

    const tabs = [
        {id: 0 , icon: StorefrontIcon, name: "Store Setup", color: 'rgb(0, 158, 66)'},
        {id: 1 , icon: FormatListNumberedIcon, name: "Manage Orders", color: 'rgb(0, 140, 158)'},
        {id: 2 , icon: AccessTimeIcon, name: "Store Timings", color: 'rgb(233, 37, 2)'},
        {id: 3 , icon: MenuBookIcon, name: "Food Menu", color: 'rgb(2, 56, 233)'},
        {id: 4 , icon: AssessmentIcon, name: "Store Reports", color: 'rgb(156, 0, 204)'},
        {id: 5 , icon: ConfirmationNumberIcon, name: "Coupon", color: 'rgb(204, 0, 68)'},
        {id: 6 , icon: PaymentsIcon, name: "Payout Request", color: 'rgb(105, 1, 91)'},
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
