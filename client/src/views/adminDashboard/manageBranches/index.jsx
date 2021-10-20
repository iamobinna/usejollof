import {useState, useEffect} from 'react';
import './styles/style.css';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Table from '../../../components/table';


const Index = () => {

    const userColumns = [
        {id: 'name', label: 'Name', minWidth: ''},
        {id: 'email', label: 'E-mail', minWidth: ''},
        {id: 'location', label: 'Location', minWidth: ''},
        {id: 'type', label: 'Type', minWidth: ''},
    ];

    const [value, setValue] = useState('not selected');
    const [age, setAge] = useState('all');
    const [emails, setEmails] = useState([]);

    const [users, setUsers] = useState([
        {id: 0, name: 'Shah Fahad',location: 'Karachi' ,email: 'fahad@gmail.com', type: 'rider'},
        {id: 1, name: 'Shah Fahad',location: 'New York' ,email: 'saad@gmail.com', type: 'vendor'},
        {id: 2, name: 'Shah Fahad',location: 'Malir' ,email: 'naeem@gmail.com', type: 'vendor'},
        {id: 3, name: 'Shah Fahad',location: 'Karachi' ,email: 'obinna@gmail.com', type: 'rider'},
        {id: 4, name: 'Shah Fahad',location: 'Malir' ,email: 'awoofa@gmail.com', type: 'rider'},
        {id: 5, name: 'Shah Fahad',location: 'Karachi' ,email: 'shahfahad@gmail.com', type: 'user'},
        {id: 6, name: 'Shah Fahad',location: 'New York' ,email: 'fahad091@gmail.com', type: 'partner'},
        {id: 7, name: 'Shah Fahad',location: 'Karachi' ,email: 'fahadiffi@gmail.com', type: 'partner'},
        {id: 8, name: 'Shah Fahad',location: 'Lahore' ,email: 'fahadshah@gmail.com', type: 'rider'},
        {id: 9, name: 'Shah Fahad',location: 'Multan' ,email: 'shayan@gmail.com', type: 'rider'},
        {id: 10, name: 'Shah Fahad',location: 'Karachi' ,email: 'kshayan091@gmail.com', type: 'user'},
        {id: 11, name: 'Shah Fahad',location: 'Multan' ,email: 'bro@gmail.com', type: 'partner'},
    
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
