import './styles/style.css';
import SearchIcon from '@mui/icons-material/Search';
import ManageBranches from '../manageBranches';
import Commission from '../Commission';
import ManageLocations from '../manageLocations';
import ManageMenu from '../manageMenu';
// import ManageMerchant from '../manageMerchant';
import ManageOffers from '../manageOffers';
import ManageOrders from '../manageOrders';
import ManagePayouts from '../managePayouts';
import ManagePrices from '../managePrices';
import ManageTimings from '../manageTimings';
import ManageUser from '../manageUser';
import ManageWallets from '../manageWallets';

const Index = ({currentIndex}) => {

    const tabs = [
        {id: 0 , component: ManageUser, name: "Manage Requests"},
        // {id: 1 , component: ManageMerchant, name: "Manage Merchants"},
        {id: 1 , component: ManageOrders, name: "Manage Orders"},
        {id: 2 , component: ManageTimings, name: "Manage Timings"},
        {id: 3 , component: ManageBranches, name: "Manage Accounts"},
        {id: 4 , component: ManagePayouts, name: "Manage Payouts"},
        {id: 5 , component: ManagePrices, name: "Manage Prices"},
        {id: 6 , component: ManageWallets, name: "Manage Wallets"},
        {id: 7 , component: ManageOffers, name: "Mannge Offers"},
        {id: 8 , component: ManageMenu, name: "Manage Categories"},
        {id: 9, component: ManageLocations, name: "Manage Locations"},
        {id: 10, component: Commission, name: "Commission"},
    ]
    return (
        <div className="user-dashboard-main">
            {tabs.map((tab) => {
                if (tab.id === currentIndex) {
                    return (
                    <>
                        <div className="user-upper">
                            <h1>{tab.name}</h1>
                            <div className="user-search-bar">
                                <input type="text" placeholder='Search' />
                                <SearchIcon/>
                            </div>
                        </div>
                        <tab.component />
                    </>
                    );
                } else return null;
            })}
        </div>
    )
}

export default Index
