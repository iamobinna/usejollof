import './styles/style.css';
import DeleteIcon from '@mui/icons-material/Delete';
import ShareIcon from '@mui/icons-material/Share';
import Button1 from '../../../components/Button1';
import Button2 from '../../../components/Button2';
import Button3 from '../../../components/Button3';
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


const Index = () => {

    return (
        <div className="user-schedule">
            <h3>Ongoing orders</h3>
        </div>
    )
}

export default Index;
