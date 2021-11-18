import React, {useEffect} from "react";
import SignIn from '../signIn';
import Map from '../maps';
import Orders from '../orders';
import './styles/style.css';
import e from "cors";

const Index = ({currentIndex, user, setUser}) => {
    const tabs = [
        // {id: 2, component: SignIn, name: 'Sign In', to: '/' },
        {id: 1, component: Map, name: 'On going', to: '/account' },
        {id: 0, component: Orders, name: 'Orders', to: '/wallet' }
    ];

    useEffect(() => {
        console.log('driverData', user);
    }, []);

    if(!user || user === null){
        return (
                <div className="delivery-main">
                    <SignIn user={user} setUser={setUser} />
            </div>
        )
    }

    

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
