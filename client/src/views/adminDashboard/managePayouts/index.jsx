import {useState} from 'react';
import './styles/style.css';
import Table from '../../../components/table';

const Index = () => {

    const columns = [
        {id: 'name', label: 'Name', minWidth: ''},
        {id: 'email', label: 'E-mail', minWidth: ''},
        {id: 'location', label: 'Location', minWidth: ''},
        {id: 'type', label: 'Type', minWidth: ''},
        {id: 'dateOfRequest', label: 'Date of Request', minWidth: ''},
        {id: 'requestedAmount', label: 'Requested Amount', minWidth: ''},
    ];

    const [data] = useState([
        {name: 'Shah Fahad', email: 'fahad@gmail.com', location: 'Karachi', type: 'Rider', dateOfRequest: '7-7-2012', requestedAmount: '$ 50'},
        {name: 'Shah Fahad', email: 'fahad@gmail.com', location: 'Karachi', type: 'Rider', dateOfRequest: '7-7-2012', requestedAmount: '$ 50'},
        {name: 'Shah Fahad', email: 'fahad@gmail.com', location: 'Karachi', type: 'Rider', dateOfRequest: '7-7-2012', requestedAmount: '$ 50'},
        {name: 'Shah Fahad', email: 'fahad@gmail.com', location: 'Karachi', type: 'Rider', dateOfRequest: '7-7-2012', requestedAmount: '$ 50'},
        {name: 'Shah Fahad', email: 'fahad@gmail.com', location: 'Karachi', type: 'Rider', dateOfRequest: '7-7-2012', requestedAmount: '$ 50'},
        {name: 'Shah Fahad', email: 'fahad@gmail.com', location: 'Karachi', type: 'Rider', dateOfRequest: '7-7-2012', requestedAmount: '$ 50'},
        {name: 'Shah Fahad', email: 'fahad@gmail.com', location: 'Karachi', type: 'Rider', dateOfRequest: '7-7-2012', requestedAmount: '$ 50'},
    ])

    return (
        <div className='admin-users' >
            <div className="card">
                <Table columns={columns} rows={data} />
            </div>
        </div>
    )
}

export default Index
