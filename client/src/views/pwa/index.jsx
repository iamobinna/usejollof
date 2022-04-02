import {useState} from 'react';
import LeftBar from '../../components/deliveryDashboard/leftBar';
import './styles/style.css';
// import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Currentpage from './currentPage';

const Index = () => {

    const [currentIndex, setCurrentIndex] = useState(0);
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('driverData'))?.user);
    
    window.addEventListener('sign-out-driver', () => {
        setUser('');
    })
    window.addEventListener('update-account-driver', () => {
        const bla = JSON.parse(localStorage.getItem('driverData'))?.user;
        console.log('bla', bla);
        setUser(bla);
    });


    return (
        <div className="pwa-container">
            <div className='pwa' >
                <LeftBar user={user} setUser={setUser} currentIndex={currentIndex} setCurrentIndex={setCurrentIndex}/>
                <Currentpage currentIndex={currentIndex} user={user} setUser={setUser} />
            </div>
        </div>
    )
}

export default Index;
