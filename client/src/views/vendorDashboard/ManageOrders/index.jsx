import './styles/style.css';
import { useState, useEffect } from 'react';
import Table from '../../../components/table';
import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import CancelIcon from '@mui/icons-material/Cancel';

const PopUp = ({id, setID, rows, setRows}) => {
    const [age, setAge] = useState('pending');
    
    useEffect(() => {
        if(id)
        {
            setAge(rows[id.index].state);
        }
    }, [id]);
    
    if(!id)
    {
        return null;
    }

    const handleChange = (event) => {
        let arr = [...rows];
        arr[id.index] = {...arr[id.index], state: event.target.value};
        setRows(arr);
        setAge(event.target.value);
    };


    return(
        <div className="pop-up-container">
            <div className="pop-up box">
                <CancelIcon className='close-btn' onClick = {() => setID(null)} />
                <div className="pop-up-upper">
                    <div className="pop-up-col1">
                        <span>Order No.</span>
                        <span>Item</span>
                        <span>Location</span>
                        <span>Price</span>
                        <span>Order placed at</span>
                        <span>Order state</span>
                    </div>
                    <div className="pop-up-col1">
                        <span>12</span>
                        <span>Burger</span>
                        <span>Karachi</span>
                        <span>50$</span>
                        <span>2021-10-5</span>
                    </div>
                </div>
                <Select
                    labelId="demo-simple-select-label"
                    size='small'
                    id="demo-simple-select"
                    value={age}
                    label="Order state"
                    style={{marginTop: '10px'}}
                    onChange={handleChange}
                    >
                        <MenuItem value={'pending'}>Pending</MenuItem>
                        <MenuItem value={'ready'}>Ready</MenuItem>
                        <MenuItem value={'cooking'}>Cooking</MenuItem>
                        <MenuItem value={'onTheWay'}>On the way</MenuItem>
                </Select>
                <div className="pop-up-buttons">
                    <div className='button button-2 '>
                        <h4 className="button-text">Driver</h4>
                        <DeliveryDiningIcon style={{color: 'red'}} className='button-icon'/>
                    </div>
                    <div className='button button-2 '>
                        <h4 className="button-text">Delivery</h4>
                        <LocalShippingIcon style={{color: 'red'}} className='button-icon'/>
                    </div>
                </div>
            </div>
        </div>
    )
}


const Index = () => {

    const columns = [
        {id: 'orderNumber', label: 'Order No.', minWidth: ''},
        {id: 'item', label: 'Item', minWidth: ''},
        {id: 'location', label: 'Location', minWidth: ''},
        {id: 'state', label: 'Order state', minWidth: ''},
    ];
    const columns1 = [
        {id: 'orderNumber', label: 'Order No.', minWidth: ''},
        {id: 'item', label: 'Item', minWidth: ''},
        {id: 'location', label: 'Location', minWidth: ''},
        {id: 'action', label: 'Actions', minWidth: ''},
    ];

    const [rows, setRows] = useState([
        {id: 1, orderNumber: '12', item: 'Burger', location: 'Karachi', state: 'pending'},
        {id: 2, orderNumber: '12', item: 'Burger', location: 'Karachi', state: 'pending'},
        {id: 3, orderNumber: '12', item: 'Burger', location: 'Karachi', state: 'pending'},
        {id: 4, orderNumber: '12', item: 'Burger', location: 'Karachi', state: 'pending'},
        {id: 5, orderNumber: '12', item: 'Burger', location: 'Karachi', state: 'pending'},
    ]);

    const [rows1, setRows1] = useState([
        {id: 6, orderNumber: '13', item: 'Burger', location: 'Karachi', state: 'pending'},
        {id: 7, orderNumber: '14', item: 'Burger', location: 'Karachi', state: 'pending'},
        {id: 8, orderNumber: '15', item: 'Burger', location: 'Karachi', state: 'pending'},
        {id: 9, orderNumber: '16', item: 'Burger', location: 'Karachi', state: 'pending'},
        {id: 10, orderNumber: '17', item: 'Burger', location: 'Karachi', state: 'pending'},
    ]);

    const [id, setID] = useState(null);

    const clickHandler = (id, index) => {
        setID({id, index});
    }

    const Action = ({id}) => {

        const Reject = () => {
            if(id)
            {
                let arr = [...rows1];
                arr.splice(id.index, 1);
                setRows1(arr);
            }
        }

        const Accept = () => {
            if(id)
            {
                let arr1 = [...rows];
                arr1.push(rows1[id.index]);
                setRows(arr1);
                arr1 = [...rows1];
                arr1.splice(id.index, 1);
                setRows1(arr1);
            }
        }
        return(
            <div className="vendor-order-buttons">
                <div className='button button-2 ' onClick={() => Accept()} >
                    <h4 className="button-text">Approve</h4>
                    <DeliveryDiningIcon style={{color: 'red'}} className='button-icon'/>
                </div>
                <div className='button button-2 ' onClick={() => Reject()} >
                    <h4 className="button-text">Reject</h4>
                    <LocalShippingIcon style={{color: 'red'}} className='button-icon'/>
                </div>
            </div>
        )
    }    

    return (
        <div className='vendor-orders' >
            <h3>On going orders</h3>
            <PopUp id={id} setID={setID} rows={rows} setRows={setRows} />
            <div className="card" style={{width: 'fit-content', maxWidth: '100%'}}>
                <Table rows={rows} columns={columns} clickHandler={clickHandler} />
            </div>
            <h3 style={{marginTop: '40px'}} >Pending for approval</h3>
            <div className="card" style={{width: 'fit-content', maxWidth: '100%'}} >
                <Table rows={rows1} columns={columns1} noHover={true} Action={Action} />
            </div>
        </div>
    )
}

export default Index;