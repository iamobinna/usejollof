import './styles/style.css';
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import EditLocationIcon from '@mui/icons-material/EditLocation';
import WrongLocationIcon from '@mui/icons-material/WrongLocation';
import CancelIcon from '@mui/icons-material/Cancel';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import GoogleMap from '../../../components/GoogleMap';
import {useState, useEffect} from 'react';


const PopUp = ({open, setOpen, addLocation, eLocation, setELocation}) => {

    const [location, setLocation] = useState(null);

    useEffect(() => {
        console.log('location: ', location);
    }, [location]);

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


const Index = () => {

    const [open, setOpen] = useState(false);
    const [eLocation, setELocation] = useState(null);

    const [locations, setLocations] = useState([]);

    const addLocation = (location) => {
        if(location)
        {
            setLocations(locations => [...locations, location]);
        }
    }

    const deleteLocation = (index) => {
        let arr = [];
        for (let i = 0; i < locations.length; i++) {
            if(i !== index)
            {
                arr.push(locations[i]);
            }
        }
        setLocations(arr);
    }

    const editLocation = (index) => {
        setELocation(locations[index].latLng);
        setOpen(true);
    }

    return (
        <div className="user-addresses">
            <h3 className='flex' >Mange Addresses <LocationOnIcon/> </h3>
            <PopUp setELocation={setELocation} eLocation={eLocation} open={open} addLocation={addLocation} setOpen={setOpen} />
            <button className='add-location-btn box' onClick={() => setOpen(true)} >
                <div className="flex">
                    <span>Add Location</span>
                    <AddLocationAltIcon/>
                </div>
            </button>
            <div className="user-address-list flex fit">
            {
                locations.length > 0 && locations.map((location, index) => (
                    <div className="user-address box flex">
                        <span>{location.address}</span>
                        <div className="flex">
                            <div className="icon-btn flex" onClick={() => editLocation(index)} >
                                <EditLocationIcon/>
                            </div>
                            <div className="icon-btn red flex" onClick={() => deleteLocation(index)} >
                                <WrongLocationIcon/>
                            </div>
                        </div>
                    </div>
                ))
            }
            </div>
        </div>
    )
}

export default Index
