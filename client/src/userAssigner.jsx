import "./app.css";
import UserDashboard from './views/userDashboard';
import VendorDashboard from './views/vendorDashboard';
import PartnerDashboard from './views/partnerDashboard';
import PWA from './views/pwa';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import DateAdapter from '@mui/lab/AdapterMoment';
import AdminDashboard from './views/adminDashboard';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import {Redirect} from 'react-router-dom';
import { useState } from "react";

function App() {

    const [user, setUser] = useState(JSON.parse(localStorage.getItem('userData'))?.user);
    
    window.addEventListener('sign-out', () => {
        setUser('');
    })
    window.addEventListener('update-account', () => {
        const bla = JSON.parse(localStorage.getItem('userData'))?.user;
        console.log('bla', bla);
        setUser(bla);
    })

    switch (user?.type) {
        case 'user':
            return(
                <Route path = '/' exact>
                    <UserDashboard user={user}  />
                </Route>
            );
    
        case 'vendor':
            return(
                    <Route path = '/' exact>
                        <LocalizationProvider dateAdapter={DateAdapter} >
                            <VendorDashboard user = {user} />
                        </LocalizationProvider>
                    </Route>
            );

        case 'admin':
            return(
                    <Route path = '/' exact>
                        <LocalizationProvider dateAdapter={DateAdapter} >
                            <AdminDashboard user={user}  />
                        </LocalizationProvider>
                    </Route>
            );

        case 'partner':
            return(
                <Route path = '/' exact>
                        <LocalizationProvider dateAdapter={DateAdapter} >
                            <PartnerDashboard user={user}  />
                        </LocalizationProvider>
                    </Route>
            )
        // case 'deliveryBoy':
        //     return(
        //         <Route path = '/' exact component={PWA} />
                
        //         )
        default:
            return (
                <Redirect to='/signin' />
            );
    }
}

export default App;
