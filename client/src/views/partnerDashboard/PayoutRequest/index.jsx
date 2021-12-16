import { useState, useEffect } from 'react';
import './styles/style.css';
import TextField from '@mui/material/TextField';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import { createWallet, getWallet } from '../../../services/axios/wallet';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';

const Index = () => {

    const [hasWallet, setHasWallet] = useState(false);
    // const [isAccepted, setIsAccepted] = useState(false);
    const [age, setAge] = useState('');
    const [alert, setAlert] = useState(null);
    const [sending, setSending] = useState(false);

    const handleChange = (event) => {
        setAge(event.target.value);
    };

    const fetch = async () => {
        const data = await getWallet();
        if(data){
            setHasWallet(true);
            if(!data.accepted){
                setSending(true);
                setAlert('Your request is under Process, If it took too long contact Admins')
            }else{
                setSending(false);
            }
        }else{
            setHasWallet(false);
        }
    }

    useEffect(() => {
        fetch();
    }, []);

    const _createWallet = async (e) => {
        e.preventDefault();
        if(!sending){
            setSending(true);
            const data = await createWallet(age);
            // setSending(false);
            if(data){
                setAlert('Request Sent');
                //request Sent
            }else{
                setAlert('There was problem making request')
            }
        }
    }

    return (
        <>
        {
            alert && <Alert severity='info'>{alert}</Alert>
        }
        {
            !sending && <>
                {
                    (hasWallet)?
                    <>
                        <div className="box revenue-card fit" style={{marginBottom:'30px'}}>
                            <h4>Revenue ${50}</h4>
                        </div>
                        <div className="card fit">
                            <div className="vendor-payquest-paragraph">
                                <div>Request</div>
                                <TextField
                                        id="outlined-basic"
                                        inputProps={{
                                            style: { fontSize: 15},
                                        }}
                                        InputLabelProps={{
                                            style: { fontSize: 15 },
                                        }}
                                        size="small"
                                        type='number'
                                        label="Amount"
                                        variant="outlined"
                                    />
                                <div>From admin on card number</div>
                                <TextField
                                        id="outlined-basic"
                                        inputProps={{
                                            style: { fontSize: 15},
                                        }}
                                        InputLabelProps={{
                                            style: { fontSize: 15 },
                                        }}
                                        size="small"
                                        label="Card Number"
                                        type='number'
                                        variant="outlined"
                                    />
                            </div>
                                <div className='button button-hover fit' style={{marginTop: '20px'}} >
                                    <div className="button-bg" style={{background: 'blue', zIndex: '0'}} ></div>
                                    <h4 className="button-text" style={{position: 'relative'}} >Proceed</h4>
                                    <AccountBalanceIcon className='button-icon' style={{position: 'relative'}}/>
                                </div>
                        </div>
                    </>
                    :
                    <>
                        <h3>Request a Wallet</h3>
                        <form className="card fit" style={{
                            flexDirection: 'column',
                            display: 'flex',
                            rowGap: '20px'
                        }} onSubmit={e =>_createWallet(e)} >
                            <FormControl style={{
                                minWidth: '200px'
                            }}>
                                <InputLabel id="demo-simple-select-label">Select account type</InputLabel>
                                <Select
                                required
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={age}
                                label="Select Account Type"
                                onChange={handleChange}
                                >
                                <MenuItem value={'credit'}>Credit</MenuItem>
                                <MenuItem value={'debit'}>Debit</MenuItem>
                                </Select>
                            </FormControl>
                            <Button type='submit' variant='contained' >Request</Button>
                        </form>
                    </>
                }
            </>
        }
        </>
    )
}

export default Index;
