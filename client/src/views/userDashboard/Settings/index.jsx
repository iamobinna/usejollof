import './styles/style.css';
import Switch from '@mui/material/Switch';
import { useEffect, useState } from 'react';
import { Button, TextField } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import CancelIcon from '@mui/icons-material/Cancel';
import UpgradeIcon from '@mui/icons-material/Upgrade';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import './styles/style.css';
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import EditLocationIcon from '@mui/icons-material/EditLocation';
import WrongLocationIcon from '@mui/icons-material/WrongLocation';
import Alert from "@mui/material/Alert";
import GoogleMap from '../../../components/GoogleMap';
import { requestUpgrade } from '../../../services/axios/request';


const AddressPopUp = ({open, setOpen, addLocation, eLocation, setELocation}) => {

    const [location, setLocation] = useState(null);

    if(!open)
    {
        return null;
    }

    return(
        <div className="pop-up-container">
            <div className="pop-up box" style={{minWidth: '500px'}} >
                <CancelIcon className='close-btn' onClick = {() => {setOpen(false); setELocation(null)}} />
                    <GoogleMap eLocation={eLocation} setLocation={setLocation} />
                <div className="pop-up-buttons">
                    <div className='button button-hover' onClick={() => {location && addLocation(location); setOpen(false)}} >
                        <div className="button-bg" style={{background: 'green', zIndex: '0'}} ></div>
                        <h4 className="button-text" style={{position: 'relative'}}>Add</h4>
                        <AddLocationAltIcon className='button-icon' style={{position: 'relative'}}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

const PopUp = ({id, setID}) => {

    const [type, setType] = useState('');
    const [name, setName] = useState('');
    const [open, setOpen] = useState(false);
    const [eLocation, setELocation] = useState(null);
    const [alert, setAlert] = useState(null);
    const [locations, setLocations] = useState('');

    const addLocation = (location) => {
        if(location)
        {
            setLocations(location);
        }
    }

    const deleteLocation = () => {
        setLocations('');
    }

    const editLocation = () => {
        setELocation(locations.latLng);
        setOpen(true);
    }

    if(!id)
    {
        return null;
    }

    const request = async (e) => {
        setAlert('');
        e.preventDefault();
        if(locations === '')
        {
            setAlert('Specify a location');
        }
        else{
            const res = await requestUpgrade({requestedFor: type, location: locations, name});
            if(res)
            {
                setAlert('Request sent')
            }else{
                setAlert('There was some error')
            }
        }
    }

    return(
        <div className="pop-up-container">
            <div className="pop-up box">
            {alert && (
                    <Alert severity="warning" style={{ marginBottom: "20px" }}>
                        {alert && alert}
                    </Alert>
                )}
                <CancelIcon className='close-btn' onClick = {() => { setAlert(''); setID(null);}} />
                <form onSubmit={(e) => request(e)}>
                    <div className="pop-up-upper">
                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            rowGap: '20px'
                        }} >
                            <TextField
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                size="small"
                                inputProps={{
                                style: { fontSize: 13 },
                                    }}
                                InputLabelProps={{
                                    style: { fontSize: 13 },
                                    }}
                                    label="Store Name"
                                    variant="outlined"
                                    />
                            <FormControl fullWidth>
                                <InputLabel size='small' id="demo-simple-select-label">Request for?</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={type}
                                    required
                                    label="Request for?"
                                    size='small'
                                    onChange={(e) => setType(e.target.value)}
                                >
                                    <MenuItem  value={'vendor'}>Vendor (Food) </MenuItem>
                                    <MenuItem  value={'partner'}>Partner (Delivery) </MenuItem>
                                </Select>
                            </FormControl>
                            { locations === '' && 
                            <button className='add-location-btn box' onClick={() => setOpen(true)} >
                                <div className="flex">
                                    <span>Add Location</span>
                                    <AddLocationAltIcon/>
                                </div>
                            </button>}
                            <div className="user-address-list flex fit" style={{
                                marginBottom: '20px',
                                marginTop: '10px'
                            }} >
                            {
                                locations !== '' &&
                                    <div className="user-address box flex">
                                        <span>{locations.address}</span>
                                        <div className="flex">
                                            <div className="icon-btn flex" onClick={() => editLocation()} >
                                                <EditLocationIcon/>
                                            </div>
                                            <div className="icon-btn red flex" onClick={() => deleteLocation()} >
                                                <WrongLocationIcon/>
                                            </div>
                                        </div>
                                    </div>
                            }
                            </div>
                            <AddressPopUp setELocation={setELocation} eLocation={eLocation} open={open} addLocation={addLocation} setOpen={setOpen} />
                        </div>
                    </div>
                    <button type='submit' style={{
                        outline: 'none',
                        border: 'none'
                    }} className='button button-hover'>
                        <div className="button-bg" style={{background: 'rgb(0,100, 200)', zIndex: '0'}} ></div>
                        <h4 className="button-text" style={{position: 'relative'}}>Request Upgrade</h4>
                        <UpgradeIcon className='button-icon' style={{position: 'relative'}}/>
                    </button>
                </form>
            </div>
        </div>
    )
}


const Index = () => {

    const [id, setID] = useState(null);

    useEffect(() => {
        //getUserSettings
    }, [])

    return (
        <div className='user-setting'>
            <PopUp id={id} setID={setID} />
            <h4>Notification Setting</h4>
            <div className='switch'>
                <span>Recieve Notifications via E-mail</span> <Switch defaultChecked />
            </div>
            <div className='switch s1'>
                <span>Recieve Notifications via Messages</span> <Switch defaultChecked />
            </div>
            <div className="updgradeToVendor" style={{
                marginTop: '80px'
            }} >
                <Button onClick={() => setID('1')} variant='outlined' >Upgrade To vendor</Button>
            </div>
        </div>
    )
}

export default Index
