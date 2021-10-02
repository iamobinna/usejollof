import './styles/style.css';
import Coupon from '../Coupon';
import FoodMenu from '../FoodMenu';
import MangeOrders from '../ManageOrders';
import PayoutRequest from '../PayoutRequest';
import StoreReports from '../StoreReports';
import StoreSetup from '../StoreSetup';
import StoreTimings from '../StoreTimings';
import SearchIcon from '@mui/icons-material/Search';

const Index = ({currentIndex}) => {

    const tabs = [
        {id: 0 , component: StoreSetup, name: "Store"},
        {id: 1 , component: MangeOrders, name: "Orders"},
        {id: 2 , component: StoreTimings, name: "Timings"},
        {id: 3 , component: FoodMenu, name: "Menu"},
        {id: 4 , component: StoreReports, name: "Reports"},
        {id: 5 , component: Coupon, name: "Coupon"},
        {id: 6 , component: PayoutRequest, name: "Pay-quest"},
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
