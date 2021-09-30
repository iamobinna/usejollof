import './styles/style.css';
import Table from '../../../components/table';
import DeleteIcon from '@mui/icons-material/Delete';
import Button1 from '../../../components/Button1';
import Button2 from '../../../components/Button2';
import Button3 from '../../../components/Button3';

const columns = [
    {id: 'service', label: 'Service', minWidth: '160px'},
    {id: 'spent', label: 'Spent'},
    {id: 'deliveredAt', label: 'Delivered at'},
    {id: 'date', label: 'Date', minWidth: '110px'},
    {id: 'serviceProvider', label: 'Service provider', minWidth: '160px'},
    {id: 'action', label: 'Action'},
];

const rows = [
    {service: 'Food Delivery', spent: `${50} $`, deliveredAt: 'Office', date: new Date().toISOString().split('T')[0], serviceProvider: 'De Foodies'},
    {service: 'Package Delivery', spent: `${150} $`, deliveredAt: 'Office', date: new Date().toISOString().split('T')[0], serviceProvider: 'De Delivers'},
    {service: 'Food Delivery', spent: `${40} $`, deliveredAt: 'Office', date: new Date().toISOString().split('T')[0], serviceProvider: 'De Foodies'},
    {service: 'Food Delivery', spent: `${60} $`, deliveredAt: 'Office', date: new Date().toISOString().split('T')[0], serviceProvider: 'De Foodies'},
    {service: 'Package Delivery', spent: `${10} $`, deliveredAt: 'Office', date: new Date().toISOString().split('T')[0], serviceProvider: 'De Delivers'},
    {service: 'Food Delivery', spent: `${90} $`, deliveredAt: 'Office', date: new Date().toISOString().split('T')[0], serviceProvider: 'De Foodies'},
    {service: 'Food Delivery', spent: `${440} $`, deliveredAt: 'Office', date: new Date().toISOString().split('T')[0], serviceProvider: 'De Foodies'},
]

const ActionButtons = () => {
    return(
        <div className="user-schedule-buttons">
            <div className='button button-hover'>
                <div className="button-bg"></div>
                <h4 className="button-text">Button</h4>
                <DeleteIcon className='button-icon'/>
            </div>
        </div>
    )
}

const Index = () => {
    return (
        <div className="user-schedule">
            <Table columns={columns} rows={rows} Action = {ActionButtons}/>
        </div>
    )
}

export default Index
