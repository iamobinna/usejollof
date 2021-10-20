import {useState, useEffect} from 'react';
import './styles/style.css';
import Table from '../../../components/table';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

const Index = () => {

    const columns = [
        {id: 'name', label: 'Name', minWidth: ''},
        {id: 'email', label: 'E-mail', minWidth: ''},
        {id: 'location', label: 'Location', minWidth: ''},
        {id: 'type', label: 'Type', minWidth: ''},
        {id: 'dateOfRequest', label: 'Date of Request', minWidth: ''},
        {id: 'accountType', label: 'Accouaccount', Type: 'Credit'}
    ];

    const [data, setData] = useState([
        {name: 'Shah Fahad', email: 'fahad@gmail.com', location: 'Karachi', type: 'Rider', dateOfRequest: '7-7-2012', accountType: 'Credit'},
        {name: 'Shah Fahad', email: 'fahad@gmail.com', location: 'Karachi', type: 'Rider', dateOfRequest: '7-7-2012', accountType: 'Debit'},
        {name: 'Shah Fahad', email: 'fahad@gmail.com', location: 'Karachi', type: 'Rider', dateOfRequest: '7-7-2012', accountType: 'Credit'},
        {name: 'Shah Fahad', email: 'fahad@gmail.com', location: 'Karachi', type: 'Rider', dateOfRequest: '7-7-2012', accountType: 'Debit'},
        {name: 'Shah Fahad', email: 'fahad@gmail.com', location: 'Karachi', type: 'Rider', dateOfRequest: '7-7-2012', accountType: 'Credit'},
        {name: 'Shah Fahad', email: 'fahad@gmail.com', location: 'Karachi', type: 'Rider', dateOfRequest: '7-7-2012', accountType: 'Debit'},
        {name: 'Shah Fahad', email: 'fahad@gmail.com', location: 'Karachi', type: 'Rider', dateOfRequest: '7-7-2012', accountType: 'Credit'},
    ]);

    const userColumns = [
        {id: 'name', label: 'Name', minWidth: ''},
        {id: 'email', label: 'E-mail', minWidth: ''},
        {id: 'location', label: 'Location', minWidth: ''},
        {id: 'type', label: 'Type', minWidth: ''},
        {id: 'accountType', label: 'Account Type', minWidth: ''},
        {id: 'amount', label: 'Amount', minWidth: ''},
        {id: 'creditAmount', label: 'Credit Amount', minWidth: ''}
    ];

    const [value, setValue] = useState('not selected');
    const [age, setAge] = useState('all');
    const [emails, setEmails] = useState([]);

    const [users, setUsers] = useState([
        {id: 0, name: 'Shah Fahad',location: 'Karachi' ,email: 'fahad@gmail.com', type: 'rider', amount: '$ 2500', accountType: 'Debit'},
        {id: 1, name: 'Shah Fahad',location: 'New York' ,email: 'saad@gmail.com', type: 'vendor', amount: '$ 2500', accountType: 'Credit', creditAmount: '$ 100$'},
        {id: 2, name: 'Shah Fahad',location: 'Malir' ,email: 'naeem@gmail.com', type: 'vendor', amount: '$ 2500', accountType: 'Debit'},
        {id: 3, name: 'Shah Fahad',location: 'Karachi' ,email: 'obinna@gmail.com', type: 'rider', amount: '$ 2500', accountType: 'Credit', creditAmount: '$ 100$'},
        {id: 4, name: 'Shah Fahad',location: 'Malir' ,email: 'awoofa@gmail.com', type: 'rider', amount: '$ 2500', accountType: 'Debit'},
        {id: 5, name: 'Shah Fahad',location: 'Karachi' ,email: 'shahfahad@gmail.com', type: 'user', amount: '$ 2500', accountType: 'Debit'},
        {id: 6, name: 'Shah Fahad',location: 'New York' ,email: 'fahad091@gmail.com', type: 'partner', amount: '$ 2500', accountType: 'Debit'},
        {id: 7, name: 'Shah Fahad',location: 'Karachi' ,email: 'fahadiffi@gmail.com', type: 'partner', amount: '$ 2500', accountType: 'Debit'},
        {id: 8, name: 'Shah Fahad',location: 'Lahore' ,email: 'fahadshah@gmail.com', type: 'rider', amount: '$ 2500', accountType: 'Credit', creditAmount: '$ 100$'},
        {id: 9, name: 'Shah Fahad',location: 'Multan' ,email: 'shayan@gmail.com', type: 'rider', amount: '$ 2500', accountType: 'Debit'},
        {id: 10, name: 'Shah Fahad',location: 'Karachi' ,email: 'kshayan091@gmail.com', type: 'user', amount: '$ 2500', accountType: 'Debit'},
        {id: 11, name: 'Shah Fahad',location: 'Multan' ,email: 'bro@gmail.com', type: 'partner', amount: '$ 2500', accountType: 'Credit', creditAmount: '$ 100$'},
    
    ]);

    const [filteredUsers, setFilteredUsers] = useState(users);

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
            for (let i = 0; i < users.length; i++) {
                if(users[i].email === newValue.label)
                {
                    index = i;
                    break;
                }
            }
            if(index === -1)
                return;
            console.log('index', index);
            console.log('user', users[index]);
            setFilteredUsers([users[index]]);
        }
        else{
            setFilteredUsers(users);
        }
    }

    const handleChange = (event) => {
        setAge(event.target.value);
        if(event.target.value === 'all')
        {
            setFilteredUsers(users);
            return;
        }

        const filter = event.target.value;
        let arr = users.filter(user => user.type === filter);
        setFilteredUsers(arr);
    };

    return (
        <div className='admin-users' >
            <h3>Requests</h3>
            <div className="card">
                <Table columns={columns} rows={data} />
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
