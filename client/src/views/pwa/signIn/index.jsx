import React from 'react';
import './styles/style.css';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';


const Index = () => {

    const submitAction = (e) => {
        e.preventDefault();
    }

    return (
        <div>
            <h1>Sign In</h1>
            <form onSubmit={submitAction} className='delivery-signin' >
                <TextField required id="outlined-basic" label="Email" type='email' variant="outlined" />
                <TextField required id="outlined-basic" label="Password" type='password' variant="outlined" />
                <Button className='sigin-btn-m' type='submit' variant="contained">Sign In</Button>
            </form>
        
        </div>
    )
}

export default Index
