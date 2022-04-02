import './styles/style.css';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import { createWallet, getWallet, addToWallet } from '../../../services/axios/wallet';
import { useEffect, useState } from 'react';
import Alert from '@mui/material/Alert';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import {usePaystackPayment} from 'react-paystack';
import { TextField} from '@mui/material';

const PopUp = ({setPopUp, setWallet, amount}) => {

    const [alert, setAlert] = useState(null);
    
    const config = {
        reference: (new Date()).getTime().toString(),
        email: "asokoroted@gmail.com",
        amount: parseInt(amount) * 100,
        publicKey: 'pk_test_5b3a1043319370366dc36d3883ed18a9778b83de',
    };
    const onSuccess = (reference) => {
        // Implementation for whatever you want to do with reference and after success call.
        requestServer();
    };

    useEffect(() => {
        console.log(typeof amount);
    })
    
    const requestServer = async () => {
        const data = await addToWallet(parseInt(amount));
        if(data){
            setWallet(data);
            setAlert('Cash Added to your account')
        }
      }
      
      // you can call this function anything
      const onClose = () => {
          setAlert('There was a problem adding cash')
          // implementation for  whatever you want to do when the Paystack dialog closed.
      }
      const initializePayment = usePaystackPayment(config);

      const addCash = () =>{
        //   e.preventDefault();
          setAlert('loading');
          initializePayment(onSuccess, onClose);
        }
    
      return(
            <div className="card-container">
                <div className="card">
                    {
                        alert && <Alert severity='info' >{alert}</Alert>
                    }
                    {
                        !alert &&
                        <>
                            <h4>{amount} ₦ will be added to your account</h4>

                            <Button variant='contained' onClick={() => addCash()} >PAY NOW</Button>
                        </>
                    }
                    <Button variant='outlined' onClick={() => setPopUp(false)} >Cancel</Button>
                </div>
            </div>
      )
    }

const Index = () => {

    const [amount, setAmount] = useState(10);
    const [loading] = useState(false);
    const [wallet, setWallet] = useState(null);
    // const [isAccepted, setIsAccepted] = useState(false);
    const [age, setAge] = useState('');
    const [alert, setAlert] = useState(null);
    const [sending, setSending] = useState(false);
    const [popUp, setPopUp] = useState(false)

    const handleChange = (event) => {
        setAge(event.target.value);
    };

    const fetch = async () => {
        const data = await getWallet();
        if(data){
            setWallet(data);
            console.log('wallet',data);
            if(!data.accepted){
                setSending(true);
                setAlert('Your request is under Process, If it took too long contact Admins')
            }else{
                setSending(false);
            }
        }else{
            setWallet(null);
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
            !sending &&
            <>
            {
                wallet? <>
                <div className="user-wallet">
                    {
                        popUp && <PopUp amount={amount} setPopUp={setPopUp} setWallet={setWallet} />
                    }
                    <div className="user-current-amount user-wallet-card box">
                        <AccountBalanceWalletIcon style={{fontSize: '50px'}}/>
                        <h5>Current Balance</h5>
                        <h2>{wallet.amount} ₦</h2>
                    </div>
                    {/* <div onClick={() => setPopUp(true)} className="user-add-amount user-wallet-card box">
                        <LocalAtmIcon style={{fontSize: '50px'}}/>
                        <h3>Add <br/> Balance</h3>
                    </div> */}
                    <div className="card" >
                        {
                            alert &&
                            <Alert severity='info' >{alert}</Alert>
                        }
                        {
                            !loading &&
                            <div style={{display: 'flex', flexDirection: 'column', rowGap: '20px'}}>
                                <TextField value={amount} onChange={e => setAmount(e.target.value)} type='number' size='small' />
                                <Button variant='contained' onClick={() => setPopUp(true)}>Add to your account</Button>
                            </div>
                        }
                    </div>
                </div>
                </>:
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

export default Index
