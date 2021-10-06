import './styles/style.css';
import Table from '../../../components/table';
import DeleteIcon from '@mui/icons-material/Delete';
import ShareIcon from '@mui/icons-material/Share';
import CancelIcon from '@mui/icons-material/Cancel';
import {useState} from 'react';

const columns = [
    {id: 'service', label: 'Service', minWidth: '160px'},
    {id: 'spent', label: 'Spent'},
    {id: 'deliveredAt', label: 'Delivered at', minWidth: '130px'},
    {id: 'date', label: 'Date', minWidth: '110px'},
    {id: 'serviceProvider', label: 'Service provider', minWidth: '160px'},
];

const rows = [
    {id: 1, service: 'Food Delivery', spent: `${50} $`, deliveredAt: 'Office', date: new Date().toISOString().split('T')[0], serviceProvider: 'De Foodies'},
    {id: 8, service: 'Package Delivery', spent: `${150} $`, deliveredAt: 'Office', date: new Date().toISOString().split('T')[0], serviceProvider: 'De Delivers'},
    {id: 7, service: 'Food Delivery', spent: `${40} $`, deliveredAt: 'Office', date: new Date().toISOString().split('T')[0], serviceProvider: 'De Foodies'},
    {id: 5, service: 'Food Delivery', spent: `${60} $`, deliveredAt: 'Office', date: new Date().toISOString().split('T')[0], serviceProvider: 'De Foodies'},
    {id: 4, service: 'Package Delivery', spent: `${10} $`, deliveredAt: 'Office', date: new Date().toISOString().split('T')[0], serviceProvider: 'De Delivers'},
    {id: 3, service: 'Food Delivery', spent: `${90} $`, deliveredAt: 'Office', date: new Date().toISOString().split('T')[0], serviceProvider: 'De Foodies'},
    {id: 2, service: 'Food Delivery', spent: `${440} $`, deliveredAt: 'Office', date: new Date().toISOString().split('T')[0], serviceProvider: 'De Foodies'},
]

// const ActionButtons = () => {
//     return(
//         <div className="user-schedule-buttons">
//             <div className='button button-hover'>
//                 <div className="button-bg"></div>
//                 <h4 className="button-text">Button</h4>
//                 <DeleteIcon className='button-icon'/>
//             </div>
//         </div>
//     )
// }

const PopUp = ({id, setID}) => {

    if(!id)
    {
        return null;
    }

    return(
        <div className="pop-up-container">
            <div className="pop-up box">
                <CancelIcon className='close-btn' onClick = {() => setID(null)} />
                <div className="pop-up-upper">
                    <div className="pop-up-col1">
                        <span>Service Type</span>
                        <span>Service Provider</span>
                        <span>Date</span>
                        <span>Delivered at</span>
                        <span>Total spent</span>
                    </div>
                    <div className="pop-up-col1">
                        <span>Food Delivery</span>
                        <span>De Foodies</span>
                        <span>2021-10-5</span>
                        <span>Office</span>
                        <span>50$</span>
                    </div>
                </div>
                <div className="schedule-pop-items">
                    <span>List of products</span>
                    {
                        [
                            {name: 'burger', price: 10},
                            {name: 'pizza', price: 30},
                            {name: 'Steak', price: 10},
                        ].map((item) => (
                            <div className="schedule-pop-item">
                                <div className="pop-up-col1">
                                    <span>Name</span>
                                    <span>Price</span>
                                </div>
                                <div className="pop-up-col1">
                                    <span>{item.name}</span>
                                    <span>$ {item.price}</span>
                                </div>
                            </div>
                        ))
                    }
                </div>
                <div className="pop-up-buttons">
                    <div className='button button-hover'>
                        <div className="button-bg" style={{background: 'red', zIndex: '0'}} ></div>
                        <h4 className="button-text" style={{position: 'relative'}}>Delete</h4>
                        <DeleteIcon className='button-icon' style={{position: 'relative'}}/>
                    </div>
                    <div className='button button-hover'>
                        <div className="button-bg" style={{background: 'blue', zIndex: '0'}} ></div>
                        <h4 className="button-text" style={{position: 'relative'}} >Share</h4>
                        <ShareIcon className='button-icon' style={{position: 'relative'}}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

const Index = ({customRows}) => {
    const [id, setID] = useState(null);

    const clickHandler = (id) => {
        setID(id);
    }
    return (
        <>
            <div className="card user-schedule">
                <Table columns={columns} customRows={customRows} rows={rows} clickHandler={clickHandler} />
            </div>
            <PopUp id={id} setID={setID} />
        </>
    )
}

export default Index;
