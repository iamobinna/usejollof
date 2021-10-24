import './styles/style.css';
import {useState} from 'react';
import profilePic from '../../../static/images/profile.jpg';
import ImageInContainer from  '../../../components/imageInContainer';
import PhoneEnabledIcon from '@mui/icons-material/PhoneEnabled';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import EditIcon from '@mui/icons-material/Edit';
import ExploreIcon from '@mui/icons-material/Explore';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import { URL } from '../../../urls';

const Index = ({user}) => {

    const [edit, setEdit] = useState(false);

    return (
        <div className="user-profile">
            {
                console.log(`${URL}/uploads/${user.picUrl}`)
            }
            <div className="profile-upper">
                <div className="box profile-pic">
                    <ImageInContainer imageSrc = {`${URL}/uploads/${user.picUrl}`} />
                </div>
                <div className="profile-details">
                    <div className="d d1 box">
                        <div className="edit-btn"> <EditIcon style={{fontSize: '15px'}} /> </div>
                        <div className="profile-labels">
                            <h6><PhoneEnabledIcon style={{fontSize: '16px'}} /> Phone</h6>
                            <h6><VpnKeyIcon style={{fontSize: '16px'}}/> Password</h6>
                        </div>
                        <div className="profile-inputs">
                            <input type="text" value={'+92 316 9666987'}/>
                            <input type="password" value={'abcd1234'}/>
                        </div>
                    </div>
                    <div className="d d2 box">
                        <div className="edit-btn"> <EditIcon style={{fontSize: '15px'}} /> </div>
                        <div className="profile-labels">
                            <h6><PersonIcon style={{fontSize: '16px'}}/> Name</h6>
                            <h6><EmailIcon style={{fontSize: '16px'}}/> Email</h6>
                        </div>
                        <div className="profile-inputs">
                            <input type="text" value={'Shah Fahad'}/>
                            <input type="text" value={'shahfahadiffi@gmail.com'}/>
                        </div>
                    </div>
                </div>
            </div>
            <div className="explore-section">
                <h3>Explore <ExploreIcon/> </h3>
                <div className="user-profile-cards">
                    <div className="user-profile-card box">
                        <RestaurantIcon style={{fontSize: '40px', color: 'rgb(255, 0, 76)'}}/>
                        <h4>Restaurants</h4>
                    </div>
                    <div className="user-profile-card box">
                        <LocalShippingIcon style={{fontSize: '40px', color: 'rgb(0, 104, 240)'}}/>
                        <h4>Deliver</h4>
                    </div>
                    <div className="user-profile-card box">
                        <ConfirmationNumberIcon style={{fontSize: '40px', color: 'rgb(9, 185, 68)'}}/>
                        <h4>Coupons</h4>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Index
