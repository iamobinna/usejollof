import {useState} from 'react';
import LeftBar from '../../components/adminDashboard/leftBar';
import RightBar from '../../components/partnerDashboard/rightBar';
// import './styles/style.css';
// import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Currentpage from './currentPage';

const Index = () => {

    const [currentIndex, setCurrentIndex] = useState(0);

    return (
        <div className='user-dashboard-container' >
            <LeftBar currentIndex={currentIndex} setCurrentIndex={setCurrentIndex}/>
            <Currentpage currentIndex={currentIndex} />
            <RightBar/>
        </div>
    )
}

export default Index;