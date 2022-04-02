import { useState, useEffect } from "react";
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import ListAltIcon from '@mui/icons-material/ListAlt';
import DriveEtaIcon from '@mui/icons-material/DriveEta';
import "./styles/style.css";

const Index = ({currentIndex, setCurrentIndex, user, setUser}) => {

    const [open, setOpen] = useState(false);

    const tabs = [
        {id: 0 , icon: ListAltIcon, name: "Orders", color: 'rgb(0, 158, 66)'},
        {id: 1 , icon: DriveEtaIcon, name: "Ongoing order", color: 'rgb(0, 140, 158)'},
    ];

    const signOut = () => {
        setUser(null);
        localStorage.removeItem('driverData');
        window.dispatchEvent( new Event('sign-out-driver'));
    }

    useEffect(() => {
        setOpen(false);
    }, [currentIndex]);

    return (
        <div className="delivery-nav-container">
            <div style={{position:'relative'}} >
                <div onClick={() => setOpen(!open)} className={` ${!open && 'ham-open'} hamburger icon-acitve`}>
                    <MenuIcon/>
                </div>
                <div className={`delivery-boy-nav ${!open && 'delivery-boy-nav-close' } `}>
                    {
                        tabs.map((tab) => (
                                <div onClick={() => setCurrentIndex(tab.id)} className={` ${tab.id === currentIndex && 'delivery-nav-active'} delivery-nav-option`}>
                                    <tab.icon className='' />
                                    <span>{tab.name}</span>
                                </div>
                        ))
                    }
                        <div className={`delivery-logout delivery-nav-option`} onClick={() => signOut()} >
                            <LogoutIcon className='' />
                            <span>Log out</span>
                        </div>
                </div>
            </div>
        </div>
    );
};

export default Index;
