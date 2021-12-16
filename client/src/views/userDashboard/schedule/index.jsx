import './styles/style.css';
import {useEffect, useState} from 'react';
import Table from '../../../components/table';
import Map from '../../../components/GoogleMap';
import { getOrders } from '../../../services/axios/order';

const columns = [
    {id: 'orderCreated', label: 'Order Created', minWidth: '160px'},
    {id: 'cost', label: 'Total cost', minWidth: '160px'},
    {id: 'paid', label: 'Paid', minWidth: '160px'},
    {id: 'status', label: 'Order Status', minWidth: '160px'},
    {id: 'delivering', label: 'Order Under Delivery', minWidth: '160px'},
    {id: 'completed', label: 'Order Completed', minWidth: '160px'},
    {id: 'paymentReferenceNo', label: 'Payment Reference Number', minWidth: '160px'},
];



const Index = () => {
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

    useEffect(() => {
        console.log('rows', rows);
    }, [rows]);

    return (
        <div className="user-schedule">
            <h3>On Going Order</h3>
                <Map onlyMap={true} />
            
            <h3 style={{
                marginTop: '40px'
            }} >Past Orders</h3>
            <div className="card fit">
                <Table columns={columns} rows={rows} noHover={true} />
            </div>
        </div>
    )
}

export default Index;
