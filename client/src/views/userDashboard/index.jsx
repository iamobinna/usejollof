import {useState} from 'react';
import LeftBar from '../../components/userDashboard/leftBar';
import RightBar from '../../components/userDashboard/rightBar';
import './styles/style.css';
// import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Currentpage from './currentPage';

const Index = ({user}) => {

    const [currentIndex, setCurrentIndex] = useState(0);

    return (
        <div className='user-dashboard-container' >
            <LeftBar currentIndex={currentIndex} setCurrentIndex={setCurrentIndex}/>
            <Currentpage user={user} currentIndex={currentIndex} />
            <RightBar/>
        </div>
    )
}

export default Index;
