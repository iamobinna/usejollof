import './styles/style.css';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import HomeIcon from '@mui/icons-material/Home';
import StreetviewIcon from '@mui/icons-material/Streetview';
import MapIcon from '@mui/icons-material/Map';
import EditLocationIcon from '@mui/icons-material/EditLocation';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import GoogleMap from '../../../components/GoogleMap';

const addresses = [
    {state: 'KPK', city: 'Nowshera', street: 'Wazir Khan', HouseNumber: '12'}
]

const Index = () => {
    return (
        <div className="user-addresses">
            <h3>Mange Addresses <LocationOnIcon/> </h3>
            {/* <GoogleMap/> */}
            <div className="user-address-list">

            </div>
        </div>
    )
}

export default Index
