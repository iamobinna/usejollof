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
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import EmojiFoodBeverageIcon from '@mui/icons-material/EmojiFoodBeverage';
import { useState } from 'react';

const Index = ({currentIndex}) => {
    const [message, setMessage] = useState(false)
    const [order, setOrder] = useState(false)

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
    const orders = [
        {id: 1, item: 'Burger', from: 'City', price: 20},
        {id: 2, item: 'Pizza', from: 'City', price: 30},
        {id: 2, item: 'Pizza', from: 'City', price: 30},
        {id: 3, item: 'Sandwich', from: 'City', price: 10},
        {id: 4, item: 'Fries', from: 'City', price: 5},
        {id: 4, item: 'Fries', from: 'City', price: 5},
        {id: 5, item: 'Rice', from: 'City', price: 10},
    ];
    return (
        <div className="user-dashboard-main">
            <div className="shapes-main">
            <div className='shapes'>
              <div className="ex">
                  <span></span>
                  <span></span>
              </div>
              <div className="dot">
                <span></span>
              </div>
            </div>
            <div className='shapes'>
              <div className="ex">
                  <span></span>
                  <span></span>
              </div>
              <div className="dot">
                <span></span>
              </div>
            </div>
            <div className='shapes'>
              <div className="ex">
                  <span></span>
                  <span></span>
              </div>
              <div className="dot">
                <span></span>
              </div>
            </div>
            <div className='shapes'>
              <div className="ex">
                  <span></span>
                  <span></span>
              </div>
              <div className="dot">
                <span></span>
              </div>
            </div>
            <div className='shapes'>
              <div className="ex">
                  <span></span>
                  <span></span>
              </div>
              <div className="dot">
                <span></span>
              </div>
            </div>
            <div className='shapes'>
              <div className="ex">
                  <span></span>
                  <span></span>
              </div>
              <div className="dot">
                <span></span>
              </div>
            </div>
            <div className='shapes'>
              <div className="ex">
                  <span></span>
                  <span></span>
              </div>
              <div className="dot">
                <span></span>
              </div>
            </div>
            <div className='shapes'>
              <div className="ex">
                  <span></span>
                  <span></span>
              </div>
              <div className="dot">
                <span></span>
              </div>
            </div>
            <div className='shapes'>
              <div className="ex">
                  <span></span>
                  <span></span>
              </div>
              <div className="dot">
                <span></span>
              </div>
            </div>
            <div className='shapes'>
              <div className="ex">
                  <span></span>
                  <span></span>
              </div>
              <div className="dot">
                <span></span>
              </div>
            </div>
            <div className='shapes'>
              <div className="ex">
                  <span></span>
                  <span></span>
              </div>
              <div className="dot">
                <span></span>
              </div>
            </div>
            <div className='shapes'>
              <div className="ex">
                  <span></span>
                  <span></span>
              </div>
              <div className="dot">
                <span></span>
              </div>
            </div>
            </div>
            <div className="column">
            <div className='shapes'>
              <div className="ex">
                  <span></span>
                  <span></span>
              </div>
              <div className="dot">
                <span></span>
              </div>
            </div>
            <div className='shapes'>
              <div className="ex">
                  <span></span>
                  <span></span>
              </div>
              <div className="dot">
                <span></span>
              </div>
            </div>
            <div className='shapes'>
              <div className="ex">
                  <span></span>
                  <span></span>
              </div>
              <div className="dot">
                <span></span>
              </div>
            </div>
            <div className='shapes'>
              <div className="ex">
                  <span></span>
                  <span></span>
              </div>
              <div className="dot">
                <span></span>
              </div>
            </div>
            <div className='shapes'>
              <div className="ex">
                  <span></span>
                  <span></span>
              </div>
              <div className="dot">
                <span></span>
              </div>
            </div>
            <div className='shapes'>
              <div className="ex">
                  <span></span>
                  <span></span>
              </div>
              <div className="dot">
                <span></span>
              </div>
            </div>
            <div className='shapes'>
              <div className="ex">
                  <span></span>
                  <span></span>
              </div>
              <div className="dot">
                <span></span>
              </div>
            </div>
            <div className='shapes'>
              <div className="ex">
                  <span></span>
                  <span></span>
              </div>
              <div className="dot">
                <span></span>
              </div>
            </div>
            <div className='shapes'>
              <div className="ex">
                  <span></span>
                  <span></span>
              </div>
              <div className="dot">
                <span></span>
              </div>
            </div>
            <div className='shapes'>
              <div className="ex">
                  <span></span>
                  <span></span>
              </div>
              <div className="dot">
                <span></span>
              </div>
            </div>
            <div className='shapes'>
              <div className="ex">
                  <span></span>
                  <span></span>
              </div>
              <div className="dot">
                <span></span>
              </div>
            </div>
            </div>
            {tabs.map((tab) => {
                if (tab.id === currentIndex) {
                    return (
                    <>
                        <div className="user-upper">
                            <h1>{tab.name}</h1>
                            <div className="user-search-bar">
                                <div>
                                <input type="text" placeholder='Search' />
                                </div>
                                <div>
                                <SearchIcon/>
                                </div>
                            </div>
                        </div>
                        <div className="responsive-message">
                            <ChatBubbleIcon onClick={() => setMessage(!message)} />
                            <EmojiFoodBeverageIcon onClick={() => setOrder(!order)}/>
                        </div>
                        {message ? (
                            <div className="send-message-exit" onClick={() => setMessage(false)}>
                            <div className="send-message-body">
                                <h2>Send Message</h2>
                                <div className="message-inputs">
                                    <input type="email"  placeholder='Email'/>
                                    <textarea placeholder='Mesaage'></textarea>
                                </div>
                                <button>Send</button>
                            </div>
                        </div>
                        ) : null}
                        {order ? (
                            <div className="send-message-exit" onClick={() => setOrder(false)}>
                            <div className="send-message-body order">
                                <h2>Recent Orders</h2>
                                <div className="os">
                    <div className="o1">
                        {
                            orders.map((order) => (
                                <span>{order.item}</span>
                            ))
                        }
                    </div>
                    <div className="o2">
                        {
                            orders.map((order) => (
                                <span>{order.from}</span>
                            ))
                        }
                    </div>
                    <div className="o3">
                        {
                            orders.map((order) => (
                                <span>{order.price}</span>
                            ))
                        }
                </div>
                </div>
                            </div>
                        </div>
                        ) : null}
                        <tab.component />
                    </>
                    );
                } else return null;
            })}
        </div>
    )
}

export default Index
