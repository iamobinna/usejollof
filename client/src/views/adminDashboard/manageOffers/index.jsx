import {useState} from 'react';
import './styles/style.css';
import Table from '../../../components/table';

const Index = () => {

    const columns = [
        {id: 'email', label: 'E-mail', minWidth: ''},
        {id: 'vendor', label: 'Vendor', minWidth: ''},
        {id: 'location', label: 'Location', minWidth: ''},
        {id: 'ongoingOffers', label: 'On Going Offers', minWidth: ''},
    ];

    const [offers, setOffers] = useState([
        {vendor: 'De-Foodies', email: 'defoodies@gmail.com', location: 'karachi', onGoingOffers: '2'},
        {vendor: 'De-Foodies', email: 'defoodies@gmail.com', location: 'karachi', onGoingOffers: '2'},
        {vendor: 'De-Foodies', email: 'defoodies@gmail.com', location: 'karachi', onGoingOffers: '2'},
        {vendor: 'De-Foodies', email: 'defoodies@gmail.com', location: 'karachi', onGoingOffers: '2'},
        {vendor: 'De-Foodies', email: 'defoodies@gmail.com', location: 'karachi', onGoingOffers: '2'},
        {vendor: 'De-Foodies', email: 'defoodies@gmail.com', location: 'karachi', onGoingOffers: '2'},
    ]);

    const promoColumns = [
        {id: 'name', label: 'Name', minWidth: ''},
        {id: 'discount', label: 'Discount', minWidth: ''},
        {id: 'priceReduction', label: 'Price Reduction', minWidth: ''},
        {id: 'onPurchase', label: 'On Purchase', minWidth: ''},
        {id: 'code', label: 'Code', minWidth: ''},
    ];

    const [promos, setPromos] = useState([
        {name: 'Opening', discount: '2%', priceReduction: '', onPurchase: '', code: 'ALO564'},
        {name: 'Opening', discount: '', priceReduction: '$ 15', onPurchase: '$ 30', code: 'ALO564'},
        {name: 'Opening', discount: '2%', priceReduction: '', onPurchase: '', code: 'ALO564'},
        {name: 'Opening', discount: '', priceReduction: '$ 15', onPurchase: '$ 30', code: 'ALO564'},
        {name: 'Opening', discount: '2%', priceReduction: '', onPurchase: '', code: 'ALO564'},
    ])

    return (
        <div className='admin-users'>
            <h3>Offers</h3>
            <div className="card">
                <Table columns={columns} rows={offers} />
            </div>
            <h3 style={{marginTop: '40px'}} >Coupons</h3>
            <div className="card">
                <Table columns={promoColumns} rows={promos} />
            </div>
        </div>
    )
}

export default Index
