import './styles/style.css';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import StorefrontIcon from '@mui/icons-material/Storefront';
import DetailsIcon from '@mui/icons-material/Details';
import EmailIcon from '@mui/icons-material/Email';

const Index = () => {
    return (
        <div className="partner-store">
            <div className="vendor-store-details card fit">
                    <div className="vendor-store-col1">
                        <h5><StorefrontIcon/> Name</h5>
                        <h5><LocationOnIcon/> Location</h5>
                        <h5><EmailIcon/> Email</h5>
                        <h5><DetailsIcon/> Description</h5>
                    </div>
                    <div className="vendor-store-col1">
                        <span>De Foodies</span>
                        <span>Malir Town</span>
                        <span>partner@gmail.com</span>
                        <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid sed deleniti.</span>
                    </div>
                </div>
        </div>
    )
}

export default Index
