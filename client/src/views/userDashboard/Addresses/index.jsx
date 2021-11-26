import './styles/style.css';
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import EditLocationIcon from '@mui/icons-material/EditLocation';
import WrongLocationIcon from '@mui/icons-material/WrongLocation';
import CancelIcon from '@mui/icons-material/Cancel';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import GoogleMap from '../../../components/GoogleMap';
import {useState, useEffect} from 'react';
import { addLocation as add, getLocations as get, deleteLocation as del, updateLocation as updat} from '../../../services/axios/location';


const PopUp = ({open, setOpen, addLocation, eLocation, setELocation, updateLocation}) => {

    const [location, setLocation] = useState(null);

    // useEffect(() => {
    //     console.log('location: ', location);
    // }, [location]);

    if(!open)
    {
        return null;
    }

    return(
        <div className="pop-up-container">
            <div className="pop-up box" style={{minWidth: '500px'}} >
                <CancelIcon className='close-btn' onClick = {() => {setOpen(false); setELocation(null)}} />
                    <GoogleMap eLocation={eLocation?.location?.latLng} setLocation={setLocation} />
                <div className="pop-up-buttons">
                    <div className='button button-hover' onClick={() => {eLocation? updateLocation(location, eLocation._id) : addLocation(location); setOpen(false)}} >
                        <div className="button-bg" style={{background: 'green', zIndex: '0'}} ></div>
                        <h4 className="button-text" style={{position: 'relative'}}>{eLocation? 'Update' : 'Add'}</h4>
                        <AddLocationAltIcon className='button-icon' style={{position: 'relative'}}/>
                    </div>
                </div>
            </div>
        </div>
    )
}


const Index = ({user}) => {

    const [open, setOpen] = useState(false);
    const [first, setFirst] = useState(true);
    const [eLocation, setELocation] = useState(null);

    const [locations, setLocations] = useState([]);

    const addLocation = async (location) => {
        if(location)
        {
            const userData = JSON.parse(localStorage.getItem('userData'));
            const data = await add({
                location,
                email: userData.user.email
            })
            setLocations(locations => [...locations, data]);
        }
    }
    const fetch = async () => {
        const data = await get();
        if(data){
            setLocations(data);
        }
    }

    useEffect(() => {
        fetch()
    }, []);

    const deleteLocation = async (index) => {

        const deleted = await del(locations[index]._id);
        if(deleted)
        {
            let arr = [];
            for (let i = 0; i < locations.length; i++) {
                if(i !== index)
                {
                    arr.push(locations[i]);
                }
            }
            setLocations(arr);
        }
    }

    const updateLocation = async (location, id) => {
        const userData = JSON.parse(localStorage.getItem('userData'));
        let index = null;
        for (let i = 0; i < locations.length; i++) {
            if(locations[i]._id === id)
            {
                index = i;
                break;
            }
        }
        if(index !== null){
            // location = {...location, _id: locations[index]._id};
            console.log('here');
            const updated = await updat({location, email: userData.user.email, _id: id});
            console.log(updated);
            if(updated){
                let arr = [...locations];
                arr[index] = updated;
                setLocations(arr); ///CHECK LOCATION UPDATE
            }
        }
    }

    const editLocation = (index) => {
        setELocation(locations[index]);
        setOpen(true);
    }

    // useEffect(() => {
    //     if(first)
    //     {
    //         setFirst(false);
    //     }
    //     else{
    //         updateLocation(locations);
    //     }
    // }, [locations]);

    return (
        <div className="user-addresses">
            <h3 className='flex' >Mange Addresses <LocationOnIcon/> </h3>
            <PopUp setELocation={setELocation} eLocation={eLocation} updateLocation={updateLocation} open={open} addLocation={addLocation} setOpen={setOpen}/>
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
                        <span>{location.location.address}</span>
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
