import {useState, useEffect} from 'react';
import LeftBar from '../../components/deliveryDashboard/leftBar';
import './styles/style.css';
// import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Currentpage from './currentPage';

const Index = () => {

    const [currentIndex, setCurrentIndex] = useState(0);
    return (
        <div className="pwa-container">
            <div className='pwa' >
                <LeftBar currentIndex={currentIndex} setCurrentIndex={setCurrentIndex}/>
                <Currentpage currentIndex={currentIndex} />
            </div>
        </div>
    )
}

export default Index;
