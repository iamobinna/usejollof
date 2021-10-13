import "./app.css";
import UserDashboard from './views/userDashboard';
import VendorDashboard from './views/vendorDashboard';
import PartnerDashboard from './views/partnerDashboard';
import PWA from './views/pwa';
import SignIn from './views/SignIn';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import DateAdapter from '@mui/lab/AdapterMoment';
import AdminDashboard from './views/adminDashboard';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

function App() {
    return (
        <div>
            <BrowserRouter>
                <Switch>
                    <Route path = '/user/:id' exact component={UserDashboard} />
                    <Route path = '/vendor/:id' exact>
                        <LocalizationProvider dateAdapter={DateAdapter} >
                            <VendorDashboard/>
                        </LocalizationProvider>
                    </Route>
                    <Route path = '/partner/:id' exact>
                        <LocalizationProvider dateAdapter={DateAdapter} >
                            <PartnerDashboard/>
                        </LocalizationProvider>
                    </Route>
                    <Route path = '/admin/' exact>
                        <LocalizationProvider dateAdapter={DateAdapter} >
                            <AdminDashboard/>
                        </LocalizationProvider>
                    </Route>
                    <Route path = '/delivery/:id' exact component={PWA} />
                    <Route path = '/' component={SignIn} />
                </Switch>
            </BrowserRouter>
        </div>
    );
}

export default App;
