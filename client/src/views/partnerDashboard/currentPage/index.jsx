import './styles/style.css';
import Fleet from '../fleet';
import Insight from '../insight';
import StoreSetup from '../storeSetup';
import Payout from '../PayoutRequest';
import SearchIcon from '@mui/icons-material/Search';

const Index = ({currentIndex}) => {

    const tabs = [
        {id: 0 , component: StoreSetup, name: "Store"},
        {id: 1 , component: Fleet, name: "Fleet"},
        {id: 2 , component: Insight, name: "Insight"},
        {id: 3 , component: Payout, name: "Pay-quest"},
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
