import './styles/style.css';
import Table from '../../../components/table';
import DeleteIcon from '@mui/icons-material/Delete';
import ShareIcon from '@mui/icons-material/Share';
import CancelIcon from '@mui/icons-material/Cancel';
import {useState, useEffect} from 'react';
import { getOrders } from '../../../services/axios/order';

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

const columns = [
    {id: 'orderCreated', label: 'Order Created', minWidth: '160px'},
    {id: 'cost', label: 'Total cost', minWidth: '160px'},
    {id: 'paid', label: 'Paid', minWidth: '160px'},
    {id: 'status', label: 'Order Status', minWidth: '160px'},
    {id: 'delivering', label: 'Order Under Delivery', minWidth: '160px'},
    {id: 'completed', label: 'Order Completed', minWidth: '160px'},
    {id: 'paymentReferenceNo', label: 'Payment Reference Number', minWidth: '160px'},
];



const Index = ({customRows}) => {
    const [id, setID] = useState(null);
    const [rows, setRows] = useState([]);

    const fetchData = async () => {
        const data = await getOrders();
        if(data){
            console.log('data', data);
            setRows(data);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

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
