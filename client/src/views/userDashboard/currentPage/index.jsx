import React from "react";
import Profile from '../profile';
import History from '../History';
import Schedule from '../schedule';
import Settings from '../Settings';
import Share from '../Share';
import Wallet from '../Wallet';
import Home from '../home';
import Addresses from '../Addresses';
import SearchIcon from '@mui/icons-material/Search';
import './styles/style.css';

const Index = ({currentIndex, user}) => {
    const tabs = [
        {id: 0, component: Home, name: 'Home', to: '/' },
        {id: 1, component: Profile, name: 'Profile', to: '/account' },
        {id: 2, component: Wallet, name: 'Wallet', to: '/wallet' },
        {id: 3, component: Addresses, name: 'Manage Addresses',  to: '/manage-address' },
        {id: 4, component: Schedule, name: 'Schedule',  to: '/ongoing-orders' },
        {id: 5, component: History, name: 'History',  to: '/history' },
        // {id: 6, component: Share, name: 'Share',  to: '/share-friend' },
        {id: 6, component: Settings, name: 'Settings', to: '/settings' },
    ];

    return (
        <div className="user-dashboard-main">
            {tabs.map((tab) => {
                if (tab.id === currentIndex) {
                    return (
                    <>
                        <div className="user-upper">
                            <h1>{tab.name}</h1>
                            <div className="user-search-bar">
                                <input type="text" placeholder='Search' />
                                <SearchIcon/>
                            </div>
                        </div>
                        <tab.component user={user} />
                    </>
                    );
                } else return null;
            })}
        </div>
    );
};

export default Index;
