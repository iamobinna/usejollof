import './styles/style.css';
import CommuteIcon from '@mui/icons-material/Commute';
import Table from '../../../components/table';
import { useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import ShareIcon from '@mui/icons-material/Share';
import CancelIcon from '@mui/icons-material/Cancel';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const PopUp = ({id, setID}) => {
        
    const [age, setAge] = useState('');
      
    const handleChange = (event) => {
          setAge(event.target.value);
        };

    const vehicles = [
        {type: 'Motorcycle', left: 2},
        {type: 'Bicycle', left: 2},
        {type: 'Car', left: 2},
        {type: 'Truck', left: 2},
        {type: 'Heavy Bike', left: 2},
    ]    
    
    if(!id)
    {
        return null;
    }

    return (
        <div className="pop-up-container">
            <div className="pop-up box">
                <CancelIcon className="close-btn" onClick={() => setID(null)} />
                <div className="pop-up-upper">
                    <div className="pop-up-col1">
                        <span>Name</span>
                        <span>Age</span>
                        <span>Gender</span>
                        <span>Vehicle</span>
                        <span>Location</span>
                    </div>
                    <div className="pop-up-col1">
                        <span>Obinna</span>
                        <span>34</span>
                        <span>Male</span>
                        <span>Motorcyle</span>
                        <span>Karachi</span>
                    </div>
                </div>
                <FormControl style={{
                    marginTop: '20px'
                }} >
                    <InputLabel size='small' id="demo-simple-select-label">Vehicle</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={age}
                        label="Vehicle"
                        size='small'
                        onChange={handleChange}
                    >
                        {
                            vehicles.map((vehicle) => (
                                <MenuItem key={vehicle.type} value={vehicle.type} >
                                <div className='partner-fleet-menu-item flex' >
                                    <span>{vehicle.type}</span>
                                    <span>stock: {vehicle.left}</span>
                                </div>
                                </MenuItem>
                            ))
                        }
                        {/* <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem> */}
                    </Select>
                </FormControl>
                <div className="pop-up-buttons">
                    <div className="button button-hover">
                        <div
                            className="button-bg"
                            style={{ background: "red", zIndex: "0" }}
                        ></div>
                        <h4
                            className="button-text"
                            style={{ position: "relative" }}
                        >
                            Confirm Change
                        </h4>
                        <DeleteIcon
                            className="button-icon"
                            style={{ position: "relative" }}
                        />
                    </div>
                    <div className="button button-hover">
                        <div
                            className="button-bg"
                            style={{ background: "blue", zIndex: "0" }}
                        ></div>
                        <h4
                            className="button-text"
                            style={{ position: "relative" }}
                        >
                            remove driver
                        </h4>
                        <ShareIcon
                            className="button-icon"
                            style={{ position: "relative" }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

const Index = () => {
    const [id, setID] = useState(null);

    const clickHandler = (id) => {
        setID(id);
    }

    const columns = [
        {id: 'driver', label: 'Driver', minWidth: ''},
        {id: 'belongsTo', label: 'Belongs To', minWidth: ''},
        {id: 'vehicle', label: 'Vehicle', minWidth: ''},
    ];

    const rows = [
        {id: 1, driver: 'Obinna', belongsTo: 'Karachi', vehicle: 'Motorcyle'},
        {id: 2, driver: 'Obinna', belongsTo: 'Karachi', vehicle: 'Motorcyle'},
        {id: 3, driver: 'Obinna', belongsTo: 'Karachi', vehicle: 'none'},
        {id: 4, driver: 'Obinna', belongsTo: 'Karachi', vehicle: 'Motorcyle'},
        {id: 5, driver: 'Obinna', belongsTo: 'Karachi', vehicle: 'none'},
    ];

    return (
        <div className="partner-fleet fit">
            <PopUp id={id} setID={setID} />
            <div className="card">
                <div className='partner-row1'>
                    <div className="partner-col1">
                        <h5>Current Bicycles</h5>
                        <h5>Current Motorcycles</h5>
                        <h5>Current other Vehicles</h5>
                    </div>
                    <div className="partner-col1">
                        <span>4</span>
                        <span>5</span>
                        <span>1</span>
                    </div>
                </div>
                <div className='partner-row1'>
                    <div className="partner-col1">
                        <h5>Bicycles not in use</h5>
                        <h5>Motorcycles not in use</h5>
                        <h5>Other vehicles not in use</h5>
                    </div>
                    <div className="partner-col1">
                        <span>4</span>
                        <span>5</span>
                        <span>1</span>
                    </div>
                </div>
            </div>
            <div className='button button-2 v fit'>
                <h4 className="button-text">Add Vehicle</h4>
                <CommuteIcon className='button-icon'/>
            </div>
            <h3>Drivers</h3>
            <div className="card">
                <Table rows={rows} columns = {columns} clickHandler={clickHandler} />
            </div>
        </div>
    )
}

export default Index
