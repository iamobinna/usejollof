import './styles/style.css';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import ExploreIcon from '@mui/icons-material/Explore';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import History from '../History';
import LineChart from '../../../components/lineChart';

const Index = () => {
    
    const dataValues = [1, 0, 3, 5, 2, 3, 0];
    const chartTitle = 'Orders';
    const user = 'Shah Fahad';
    return (
        <div className="user-home">
            <span style={{display: 'flex', columnGap: '10px'}} >Greetings,<h4>{user}</h4></span>
            <div className="user-home-body">
                <div className="user-current-amount user-wallet-card box">
                    <AccountBalanceWalletIcon style={{fontSize: '50px'}}/>
                    <h5>Current Balance</h5>
                    <h2>{50} $</h2>
                </div>
                <div className="card user-home-line">
                    <LineChart dataValues = {dataValues} chartTitle={chartTitle} showFrom = {7} />
                </div>
                <div className="user-home-row">
                    <div className="ongoing-tasks-temp">
                        <div className="test-task d1">
                            <h3>task</h3>
                        </div>
                        <div className="test-task d2">
                            <h3>task</h3>
                        </div>
                        <div className="test-task d1">
                            <h3>task</h3>
                        </div>
                        <div className="test-task d2">
                            <h3>task</h3>
                        </div>
                    </div>
                    <History customRows = {2} />
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
        </div>
    )
}

export default Index;
