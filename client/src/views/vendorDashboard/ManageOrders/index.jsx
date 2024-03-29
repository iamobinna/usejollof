import './styles/style.css';
import { useState, useEffect } from 'react';
import Table from '../../../components/table';
import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import CancelIcon from '@mui/icons-material/Cancel';
import { getOrders, updateOrder } from '../../../services/axios/order';
import { assignDeliveryBoy } from '../../../services/axios/assign';
import Alert from '@mui/material/Alert';
import { Button } from '@mui/material';


const PopUp = ({data, setData, id, setID, rows, setRows}) => {
    const [age, setAge] = useState('pending');
    const [sending, setSending] = useState(false);
    const [alert, setAlert] = useState(null);
    
    useEffect(() => {
        if(id)
        {
            setAge(rows[id.index].status);
        }
         // eslint-disable-next-line
    }, [id]);
    
    if(!id)
    {
        return null;
    }

    const driverAssigner = async () => {
        setSending(true);
        // let userLatLng = null;
        let vendorLatLng = null;
        let dataIndex = null;
        for (let i = 0; i < data.length; i++) {
            if(rows[id.index]._id === data[i]._id ){
                // userLatLng = data[i].userLocation.latLng;
                console.log(data[i].vendorLocation.latLng);
                vendorLatLng = data[i].vendorLocation.latLng;
                dataIndex = i;
                break;
            }
        }
        const res = await assignDeliveryBoy(vendorLatLng, rows[id.index]._id);
        if(res){
            setAlert('Driver assigned, driver will be here any minute');
            function delay(time) {
                return new Promise(resolve => setTimeout(resolve, time));
              }
              
              delay(1000).then(() => {
                  //update order
                    let arr = [...rows];
                    arr.splice(id.index, 1);
                    setRows(arr);

                    arr = [...data];
                    arr.splice(dataIndex, 1);
                    setData(arr);
              });
        }else{
            //failed
            setAlert('No Driver found, try after sometime');
            setSending(false);
        }
    }

    const handleChange = async (event) => {
        let toUpdate;
        let dat = data;
        for (let i = 0; i < data.length; i++) {
            if(id.id === data[i]._id){
                toUpdate = data[i];
                toUpdate.status = event.target.value;
                dat[i] = toUpdate; 
                break;
            }
        }
        const updated = await updateOrder(toUpdate);
        if(updated)
        {
            let arr = [...rows];
            arr[id.index] = {...arr[id.index], status: event.target.value};
            setRows(arr);
            setAge(event.target.value);
            setData(dat);
        }
    };


    return(
        <div className="pop-up-container">
            <div className="pop-up box">
                <CancelIcon className='close-btn' onClick = {() => setID(null)} />
                {
                    alert && <Alert severity='info' >{alert}</Alert>
                }
                {
                    sending? <> <Button onClick={() => setID(null)} >OKAY</Button> </> :
                    <>
                        <div className="pop-up-upper">
                            <div className="pop-up-col1">
                                {/* <span>Order No.</span> */}
                                <span>Item</span>
                                <span>Location</span>
                                <span>Order From</span>
                                <span>Price</span>
                                <span>No of {rows[id.index].item}</span>
                                <span>Order placed at</span>
                                <span>Order state</span>
                            </div>
                            <div className="pop-up-col1">
                                {/* <span>12</span> */}
                                <span>{rows[id.index].item}</span>
                                <span>{rows[id.index].location}</span>
                                <span>{rows[id.index].user}</span>
                                <span>{rows[id.index].cost}$</span>
                                <span>{rows[id.index].qty}</span>
                                <span>{rows[id.index].orderCreated}</span>
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
                            <div className='button button-2 ' onClick={() => driverAssigner()} >
                                <h4 className="button-text">Delivery</h4>
                                <LocalShippingIcon style={{color: 'red'}} className='button-icon'/>
                            </div>
                        </div>
                    </>
                }
            </div>
        </div>
    )
}


const Index = () => {
    const columns1 = [
        {id: 'item', label: 'Item', minWidth: ''},
        {id: 'location', label: 'Location', minWidth: ''},
        {id: 'qty', label: 'Quantity', minWidth: ''},
        {id: 'cost', label: 'Total Paid ($)', minWidth: ''},
        {id: 'action', label: 'Actions', minWidth: ''},
    ];
    const columns = [
        {id: 'item', label: 'Item', minWidth: ''},
        {id: 'location', label: 'Location', minWidth: ''},
        {id: 'qty', label: 'Quantity', minWidth: ''},
        {id: 'cost', label: 'Total Paid ($)', minWidth: ''},
        {id: 'status', label: 'Order State', minWidth: ''},
    ];

    const [rows, setRows] = useState([
        {id: 1, orderNumber: '12', item: 'Burger', location: 'Karachi', state: 'pending'},]);

    const [rows1, setRows1] = useState([
        {id: 6, orderNumber: '13', item: 'Burger', location: 'Karachi', state: 'pending'},]);

    const [data , setData] = useState([]);

    const [id, setID] = useState(null);

    const fetch = async () => {
        const data = await getOrders();
        if(data)
        {
            setData(data);
            console.log(data);
            let arr1 = [];
            let arr2 = [];
            for (let i = 0; i < data.length; i++) {
                // const food = await getFood(data[i].products.foodId);
                const dateObj = new Date(data[i].orderCreated);
                let myDate = (dateObj.getUTCFullYear()) + "/" + (dateObj.getMonth() + 1)+ "/" + (dateObj.getUTCDate());
                const toPush = {
                    _id: data[i]._id,
                    location: data[i].userLocation.address,
                    item: data[i].products.foodId.name,
                    orderCreated: myDate,
                    user: data[i].user,
                    cost: data[i].cost,
                    qty: data[i].products.qty,
                    status: data[i].status,
                    approved: data[i].approved
                };
                if(toPush.status !== 'rejected'){
                    if(toPush.approved === true)
                        arr1.push(toPush);
                    else if(toPush.approved === false)
                        arr2.push(toPush);
                }
            }
            setRows(arr1)
            setRows1(arr2);
        }
    }

    useEffect(() => {
        fetch();
    } ,[]);

    const clickHandler = (id, index) => {
        setID({id, index});
    }

    const Action = ({id, index}) => {

        const Reject = async () => {
            if(id)
            {
                let toUpdate;
                let dat = data;
                for (let i = 0; i < data.length; i++) {
                    if(id === data[i]._id){
                        toUpdate = data[i];
                        toUpdate.status = 'rejected';
                        dat.splice(i,1);
                        break;
                    }
                }

                const updated = await updateOrder(toUpdate);
                if(updated)
                {
                    let arr = [...rows1];
                    arr.splice(id.index, 1);
                    setRows1(arr);
                    setData(dat);
                }
            }
        }

        const Accept = async () => {
            if(id)
            {
                console.log('HERE');
                let toUpdate;
                let dat = data;
                for (let i = 0; i < data.length; i++) {
                    if(id === data[i]._id){
                        toUpdate = data[i];
                        toUpdate.approved = true;
                        dat[i] = toUpdate; 
                        break;
                    }
                }

                const updated = await updateOrder(toUpdate);
                if(updated)
                {
                    let arr1 = [...rows];
                    arr1.push(rows1[index]);
                    setRows(arr1);
                    arr1 = [...rows1];
                    arr1.splice(index, 1);
                    setRows1(arr1);
                    setData(dat);
                }
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
            {
                id &&
                <PopUp data={data} setData={setData} id={id} setID={setID} rows={rows} setRows={setRows} />
            }
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