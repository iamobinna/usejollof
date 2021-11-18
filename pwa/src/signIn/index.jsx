import React, {useState} from 'react';
import './styles/style.css';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { driverLogin } from '../services/driver';
import Alert from '@mui/material/Alert';


const Index = ({user, setUser}) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [sending, setSending] = useState(false);
    const [alert, setAlert] = useState({
        type: '',
        msg: null
    });

    const submitAction = async (e) => {
        e.preventDefault();
        if(!sending)
        {
            setSending(true);
            const data = await driverLogin({email, password});
            if(data){
                console.log('signin', data);
                setUser(data);
                setAlert({
                    type: 'success',
                    msg: 'Logged in'
                });
                setSending(false);
            }else{
                console.log('error');
                setAlert({
                    type: 'error',
                    msg: 'Wrong credentials'
                });
                setSending(false);
            }
        }
    }

    return (
        <div>
            <h1>Sign In</h1>
            <form onSubmit={submitAction} className='delivery-signin' >
                {sending? 
                    <Alert severity='info'>
                        Requesting Server...
                    </Alert>
                    :
                    <>
                    {
                        alert.msg &&
                        <Alert severity={alert.type}>
                            {alert.msg}
                        </Alert>
                    }
                    <TextField required value={email} onChange={e => setEmail(e.target.value)} id="outlined-basic" label="Email" type='email' variant="outlined" />
                    <TextField required value={password} onChange={e => setPassword(e.target.value)} id="outlined-basic" label="Password" type='password' variant="outlined" />
                    <Button className='sigin-btn-m' type='submit' variant="contained">Sign In</Button>
                    </>
                }
            </form>
        </div>
    )
}

export default Index
