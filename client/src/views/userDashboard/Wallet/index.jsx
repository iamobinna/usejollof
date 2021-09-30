import './styles/style.css';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';

const Index = () => {
    return (
        <div className="user-wallet">
            <div className="user-current-amount user-wallet-card box">
                <AccountBalanceWalletIcon style={{fontSize: '50px'}}/>
                <h5>Current Balance</h5>
                <h2>{50} $</h2>
            </div>
            <div className="user-add-amount user-wallet-card box">
                <LocalAtmIcon style={{fontSize: '50px'}}/>
                <h3>Add <br/> Balance</h3>
            </div>
        </div>
    )
}

export default Index
