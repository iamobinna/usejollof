import './styles/style.css';
import { useState, useEffect } from 'react';
import TimeSetter from '../../../components/timeSetter';
import StorefrontIcon from '@mui/icons-material/Storefront';
import LocationOnIcon from '@mui/icons-material/LocationOn';


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

    const [branches, setBranches] = useState([
        {
            name: 'De -Foodies',
            location: 'Karachi',
            timings: [
                {service: false, name: 'Monday', to: '0', from: '0'},
                {service: false, name: 'Tuesday', to: '0', from: '0'},
                {service: false, name: 'Wednesday', to: '0', from: '0'},
                {service: false, name: 'Thursday', to: '0', from: '0'},
                {service: false, name: 'Friday', to: '0', from: '0'},
                {service: false, name: 'Saturday', to: '0', from: '0'},
                {service: false, name: 'Sunday', to: '0', from: '0'},
            ]
        },
        {
            name: 'De - Delivers',
            location: 'Lahore',
            timings: [
                {service: false, name: 'Monday', to: '0', from: '0'},
                {service: false, name: 'Tuesday', to: '0', from: '0'},
                {service: false, name: 'Wednesday', to: '0', from: '0'},
                {service: false, name: 'Thursday', to: '0', from: '0'},
                {service: false, name: 'Friday', to: '0', from: '0'},
                {service: false, name: 'Saturday', to: '0', from: '0'},
                {service: false, name: 'Sunday', to: '0', from: '0'},
            ]
        },
        {
            name: 'Pizza Hut',
            location: 'Islamabad',
            timings: [
                {service: false, name: 'Monday', to: '0', from: '0'},
                {service: false, name: 'Tuesday', to: '0', from: '0'},
                {service: false, name: 'Wednesday', to: '0', from: '0'},
                {service: false, name: 'Thursday', to: '0', from: '0'},
                {service: false, name: 'Friday', to: '0', from: '0'},
                {service: false, name: 'Saturday', to: '0', from: '0'},
                {service: false, name: 'Sunday', to: '0', from: '0'},
            ]
        },
    ]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        console.log('component did mount');
        setLoading(false);
    }, []);

    if(loading)
        return(<h3>Loading</h3>)

    return (
        <div>
            <h3 style={{marginBottom: '20px'}} >Main</h3>
            <div className="card fit">
                <TimeSetter timings={timings} setTimings={setTimings} />
            </div>
            <div className="vendor-timing-branches"  >
                <h3>Branches</h3>
                {
                    branches.map((branch) => (
                        <div className="card fit">
                            <div className="vendor-timing-branch">
                                <div className="vendor-timing-branch-upper">
                                    <h5> <StorefrontIcon style={{color: 'blue'}} /> {branch.name}</h5>
                                    <h5> <LocationOnIcon style={{color: 'green'}}/> {branch.location}</h5>
                                </div>
                                <TimeSetter timings={branch.timings} setTimings={setTimings} />
                            </div>
                        </div>
                    ))
                }
            </div> 
        </div>
    );
}

export default Index;
