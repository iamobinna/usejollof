import {useState} from 'react';
import './styles/style.css';
import TimeSetter from '../../../components/timeSetter';

const Index = () => {

    const [timings, setTimings] = useState([
        {service: false, name: 'Monday', to: '0', from: '0'},
        {service: false, name: 'Tuesday', to: '0', from: '0'},
        {service: false, name: 'Wednesday', to: '0', from: '0'},
        {service: false, name: 'Thursday', to: '0', from: '0'},
        {service: false, name: 'Friday', to: '0', from: '0'},
        {service: false, name: 'Saturday', to: '0', from: '0'},
        {service: false, name: 'Sunday', to: '0', from: '0'},
    ]);

    return (
        <div>
            <div className="card">
                <TimeSetter timings={timings} setTimings={setTimings} />
            </div>
        </div>
    )
}

export default Index
