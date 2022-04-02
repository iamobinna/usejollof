import {useState} from 'react';
import './styles/style.css';
import Table from '../../../components/table';

const Index = () => {

    const columns = [
        {id: 'orderNo', label: 'Order No.', minWidth: ''},
        {id: 'item', label: 'Item', minWidth: ''},
        {id: 'customer', label: 'Customer', minWidth: ''},
        {id: 'provider', label: 'Provider', minWidth: ''},
        {id: 'dateCreated', label: 'Date Created', minWidth: ''},
        {id: 'pickupLocation', label: 'Pickup Location', minWidth: ''},
        {id: 'dropLocation', label: 'Drop Location', minWidth: ''},
    ];

    const [orders] = useState([
        {orderNo: '1244', item: 'Burger', customer: 'Obinna', provider: 'De Foodies', dateCreated: '12-4-2021', pickupLocation: 'Karachi', dropLocation: 'Multan'},
        {orderNo: '1244', item: 'Parcel', customer: 'Obinna', provider: 'De Foodies', dateCreated: '12-4-2021', pickupLocation: 'Karachi', dropLocation: 'Multan'},
        {orderNo: '1244', item: 'Burger', customer: 'Obinna', provider: 'De Foodies', dateCreated: '12-4-2021', pickupLocation: 'Karachi', dropLocation: 'Multan'},
        {orderNo: '1244', item: 'Parcel', customer: 'Obinna', provider: 'De Foodies', dateCreated: '12-4-2021', pickupLocation: 'Karachi', dropLocation: 'Multan'},
        {orderNo: '1244', item: 'Burger', customer: 'Obinna', provider: 'De delivers', dateCreated: '12-4-2021', pickupLocation: 'Karachi', dropLocation: 'Multan'},
        {orderNo: '1244', item: 'Pizza', customer: 'Obinna', provider: 'De Foodies', dateCreated: '12-4-2021', pickupLocation: 'Karachi', dropLocation: 'Multan'},
        {orderNo: '1244', item: 'Burger', customer: 'Obinna', provider: 'De Foodies', dateCreated: '12-4-2021', pickupLocation: 'Karachi', dropLocation: 'Multan'},
        {orderNo: '1244', item: 'Burger', customer: 'Obinna', provider: 'De Foodies', dateCreated: '12-4-2021', pickupLocation: 'Karachi', dropLocation: 'Multan'},
    ])

    return (
        <div className='admin-users' >
            <div className="card">
                <Table rows={orders} columns={columns} />
            </div>
        </div>
    )
}

export default Index
