import React from "react";
import SignIn from '../signIn';
import Map from '../maps';
import Orders from '../orders';
import './styles/style.css';

const Index = ({currentIndex}) => {
    const tabs = [
        {id: 2, component: SignIn, name: 'Sign In', to: '/' },
        {id: 1, component: Map, name: 'On going', to: '/account' },
        {id: 0, component: Orders, name: 'Orders', to: '/wallet' }
    ];

    return (
        <div className="delivery-main">
            {tabs.map((tab) => {
                if (tab.id === currentIndex) {
                    return (
                    <>
                        <tab.component />
                    </>
                    );
                } else return null;
            })}
        </div>
    );
};

export default Index;
