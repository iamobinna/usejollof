import {useState, useEffect} from 'react';
import './styles/style.css';
import Table from '../../../components/table';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { getWalletRequests, getWallets, updateWallet } from '../../../services/axios/adminWallet';
// import CancelIcon from '@mui/icons-material/Cancel';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import Alert from '@mui/material/Alert';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';

const Index = () => {

    const columns = [
        {id: 'name', label: 'Name', minWidth: ''},
        {id: 'email', label: 'E-mail', minWidth: ''},
        {id: 'type', label: 'Type', minWidth: ''},
        {id: 'dateCreated', label: 'Date of Request', minWidth: ''},
        {id: 'accountType', label: 'Account Type', minWidth: ''},
        {id: 'action', label: 'Actions', minWidth: ''},
    ];

    const [requests, setRequests] = useState([]);
    const [rawRequests, setRawRequests] = useState([]);
    const [setRawWallets] = useState([]);
    const [sending, setSending] = useState(false);
    const [alert, setAlert] = useState(null);

    const userColumns = [
        {id: 'name', label: 'Name', minWidth: ''},
        {id: 'email', label: 'E-mail', minWidth: ''},
        {id: 'type', label: 'Type', minWidth: ''},
        {id: 'accountType', label: 'Account Type', minWidth: ''},
        {id: 'amount', label: 'Amount', minWidth: ''},
        {id: 'creditAmount', label: 'Credit Amount', minWidth: ''}
    ];

    // const [setID] = useState(null);

    const [value, setValue] = useState('not selected');
    const [age, setAge] = useState('all');
    const [emails, setEmails] = useState([]);

    const [wallets, setWallets] = useState([]);

    const [filteredUsers, setFilteredUsers] = useState(wallets);
    const fetch = async () => {
        const wallets = await getWallets();
        if(wallets){
            setRawWallets(wallets);
            let arr = [];
            for (let i = 0; i < wallets.length; i++) {
                const dateObj = new Date(wallets[i].wallet.dateCreated);
                let myDate = (dateObj.getUTCFullYear()) + "/" + (dateObj.getMonth() + 1)+ "/" + (dateObj.getUTCDate());
                // wallets[i].wallet.dateCreated = myDate;
                arr.push({...wallets[i].user, ...wallets[i].wallet, dateCreated: myDate});
            }
            // console.log('wallets', arr);
            setWallets(arr);
            setFilteredUsers(arr);
        }

        const requests = await getWalletRequests();
        if(requests){
            setRawRequests(requests);
            let arr = [];
            for (let i = 0; i < requests.length; i++) {
                const dateObj = new Date(requests[i].wallet.dateCreated);
                let myDate = (dateObj.getUTCFullYear()) + "/" + (dateObj.getMonth() + 1)+ "/" + (dateObj.getUTCDate());
                // requests[i].wallet.dateCreated = myDate;
                arr.push({...requests[i].user, ...requests[i].wallet, dateCreated: myDate});
            }
            // console.log('requests', arr);
            setRequests(arr);
        }
    }
// eslint-disab;e-next-line
    // const clickHandler = (id) => {
    //     setID(id);
    // }

    useEffect(() => {
        fetch();
         // eslint-disable-next-line
    }, []);

    useEffect(() => {
        let arr = [];
        for (let i = 0; i < filteredUsers.length; i++) {
            arr.push({label: filteredUsers[i].email});
        }
        setEmails(arr);

    }, [filteredUsers]);

    const selectChange = (event, newValue) => {
        setValue(newValue);
        if(newValue?.label)
        {
            console.log('newValue', newValue.label);
            let index = -1;
            for (let i = 0; i < wallets.length; i++) {
                if(wallets[i].email === newValue.label)
                {
                    index = i;
                    break;
                }
            }
            if(index === -1)
                return;
            console.log('index', index);
            console.log('user', wallets[index]);
            setFilteredUsers([wallets[index]]);
        }
        else{
            setFilteredUsers(wallets);
        }
    }

    const handleChange = (event) => {
        setAge(event.target.value);
        if(event.target.value === 'all')
        {
            setFilteredUsers(wallets);
            return;
        }

        const filter = event.target.value;
        let arr = wallets.filter(user => user.type === filter);
        setFilteredUsers(arr);
    };

    const Action = ({id, index}) => {

        const Reject = async () => {
            if(id && !sending)
            {
                setSending(true);
                setAlert('Sending')
                let find = rawRequests.find(obj => obj.wallet._id === id)?.wallet;
                if(find){
                    find.answered = true;
                    find.accepted =false;
                }
                const update = await updateWallet(find);
                if(update){
                    //updated
                    console.log('updated wallet', update);
                    await fetch();
                    setAlert('updated')
                }else{
                    setAlert('There was some error updating')
                }
                setSending(false);
            }
        }

        const Accept = async () => {
            if(id && !sending)
            {
                setSending(true);
                setAlert('Sending')
                let find = rawRequests.find(obj => obj.wallet._id === id)?.wallet;
                if(find){
                    find.answered = true;
                    find.accepted = true;
                }
                const update = await updateWallet(find);
                if(update){
                    //updated
                    console.log('updated wallet', update);
                    await fetch();
                    setAlert('updated')
                }else{
                    setAlert('There was some error updating')
                }
                setSending(false);
            }
        }
        return(
            <div className="vendor-order-buttons">
                <div className='button button-2 ' onClick={() => Accept()} >
                    <h4 className="button-text">Approve</h4>
                    <ThumbUpIcon style={{color: 'red'}} className='button-icon'/>
                </div>
                <div className='button button-2 ' onClick={() => Reject()} >
                    <h4 className="button-text">Reject</h4>
                    <ThumbDownAltIcon style={{color: 'red'}} className='button-icon'/>
                </div>
            </div>
        )
    }

    return (
        <div className='admin-users' >
            <h3>Requests</h3>
            {
                alert && 
                <div className="fit" style={{padding: '10px'}} >
                    <Alert severity='info' >{alert}</Alert>
                </div>
            }
            <div className="card">
                <Table noHover={true} columns={columns} rows={requests} Action={Action} />
            </div>
            <h3 style={{marginTop: '40px'}} >All Wallets</h3>
            <div className="card">
                <div className="flex" style={{
                    rowGap: '10px',
                    flexWrap: 'wrap'
                }} >
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Account Type</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={age}
                        label="Account Type"
                        onChange={handleChange}
                    >
                    <MenuItem value={'all'}>All</MenuItem>
                    <MenuItem value={'vendor'}>Vendor</MenuItem>
                    <MenuItem value={'rider'}>Rider</MenuItem>
                    <MenuItem value={'user'}>User</MenuItem>
                    <MenuItem value={'parnter'}>Partner</MenuItem>
                    </Select>
                </FormControl>
                    <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        value={value}
                        onChange={selectChange}
                        options={emails}
                        sx={{ width: 300 }}
                        renderInput={(params) => <TextField {...params} label="Search by Email" />}
                        />
                </div>
                <Table columns={userColumns} rows={filteredUsers} />
            </div>
        </div>
    )
}

export default Index
