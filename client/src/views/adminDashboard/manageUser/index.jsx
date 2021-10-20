import {useState, useEffect} from 'react';
import './styles/style.css';
import Table from '../../../components/table';

const Index = () => {

    const applicationColumns = [
        {id: 'name', label: 'Name', minWidth: ''},
        {id: 'email', label: 'E-mail', minWidth: ''},
        {id: 'location', label: 'Location', minWidth: ''},
        {id: 'requestedFor', label: 'Requested For', minWidth: ''},
    ];

    const [applications, setApplications] = useState([
        {id: 0, name: 'Shah Fahad',location: 'Karachi' ,email: 'fahad@gmail.com', requestedFor: 'Rider'},
        {id: 1, name: 'Shah Fahad',location: 'Karachi' ,email: 'fahad@gmail.com', requestedFor: 'Merchant'},
        {id: 2, name: 'Shah Fahad',location: 'Karachi' ,email: 'fahad@gmail.com', requestedFor: 'Rider'},
        {id: 3, name: 'Shah Fahad',location: 'Karachi' ,email: 'fahad@gmail.com', requestedFor: 'Partner'},
        {id: 4, name: 'Shah Fahad',location: 'Karachi' ,email: 'fahad@gmail.com', requestedFor: 'Rider'},
        {id: 5, name: 'Shah Fahad',location: 'Karachi' ,email: 'fahad@gmail.com', requestedFor: 'Partner'},
    ]);

    return (
        <div className='admin-users' >
            <div className="card">
                <Table columns={applicationColumns} rows={applications} />
            </div>
            
        </div>
    )
}

export default Index
