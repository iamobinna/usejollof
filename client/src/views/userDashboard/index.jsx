import {useState} from 'react';
import LeftBar from '../../components/userDashboard/leftBar';
import RightBar from '../../components/userDashboard/rightBar';
import './styles/style.css';
// import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Profile from './profile';
import History from './History';
import Schedule from './schedule';
import Settings from './Settings';
import Share from './Share';
import Wallet from './Wallet';
import Home from './home';
import Addresses from './Addresses';

const Index = () => {

    const [currentIndex, setCurrentIndex] = useState(0);
    const tabs = [
        {id: 0, component: Home, to: '/' },
        {id: 1, component: Profile, to: '/account' },
        {id: 2, component: Wallet, to: '/wallet' },
        {id: 3, component: Addresses, to: '/manage-address' },
        {id: 4, component: Schedule, to: '/ongoing-orders' },
        {id: 5, component: History, to: '/history' },
        {id: 6, component: Share, to: '/share-friend' },
        {id: 7, component: Settings, to: '/settings' },
    ];

    return (
        <div className='user-dashboard-container' >
            <LeftBar currentIndex={currentIndex} setCurrentIndex={setCurrentIndex}/>
            {
                tabs.map((tab) => {
                    if(tab.id === currentIndex){
                        return(<tab.component/>)
                    }
                    else
                        return(null)
                })
            }
            <RightBar/>
        </div>
    )
}

export default Index;
