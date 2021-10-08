import './styles/style.css';
import TextField from '@mui/material/TextField';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';

const Index = () => {
    return (
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
    )
}

export default Index;
