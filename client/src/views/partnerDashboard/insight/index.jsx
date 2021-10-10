import './styles/style.css';
import LineChart from '../../../components/lineChart';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {useState} from 'react';


const Index = () => {
    const dataValues = [1, 0, 3, 5, 2, 3, 0];
    const [days, setDays] = useState('');
    const [days1, setDays1] = useState('');
    const [days2, setDays2] = useState('');

    return (
        <div className="partner-insight">
            <div className="card user-home-line">
                <LineChart dataValues = {dataValues} chartTitle={'Orders Completed'} showFrom = {7} />
                <FormControl fullWidth style={{
                    marginTop: '20px'
                }} >
                    <InputLabel size='small' id="demo-simple-select-label">Performance in the last</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={days}
                        label="Perfromance in the last"
                        size='small'
                        onChange={(event) => setDays(event.target.value)}
                    >
                        <MenuItem value={7}>Week</MenuItem>
                        <MenuItem value={14}>Fortnight</MenuItem>
                        <MenuItem value={30}>Month</MenuItem>
                    </Select>
                </FormControl>
            </div>
            <div className="card user-home-line">
                <LineChart dataValues = {dataValues} chartTitle={'Orders Failed'} showFrom = {7} />
                <FormControl fullWidth style={{
                    marginTop: '20px'
                }} >
                    <InputLabel size='small' id="demo-simple-select-label">Performance in the last</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={days1}
                        label="Perfromance in the last"
                        size='small'
                        onChange={(event) => setDays1(event.target.value)}
                    >
                        <MenuItem value={7}>Week</MenuItem>
                        <MenuItem value={14}>Fortnight</MenuItem>
                        <MenuItem value={30}>Month</MenuItem>
                    </Select>
                </FormControl>
            </div>
            <div className="card user-home-line">
                <LineChart dataValues = {dataValues} chartTitle={'Orders Retired'} showFrom = {7} />
                <FormControl fullWidth style={{
                    marginTop: '20px'
                }} >
                    <InputLabel size='small' id="demo-simple-select-label">Performance in the last</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={days2}
                        label="Perfromance in the last"
                        size='small'
                        onChange={(event) => setDays2(event.target.value)}
                    >
                        <MenuItem value={7}>Week</MenuItem>
                        <MenuItem value={14}>Fortnight</MenuItem>
                        <MenuItem value={30}>Month</MenuItem>
                    </Select>
                </FormControl>
            </div>
        </div>
    )
}

export default Index
