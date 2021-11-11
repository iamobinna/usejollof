import "./app.css";
import SignIn from './views/SignIn';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import UserAssigner from './userAssigner.jsx';
import PWA from './views/pwa';


function App() {
    window.Worker = Worker;
    return (
        <div>
            <BrowserRouter>
                <Switch>
                    <Route path = '/signin' exact component={SignIn} />
                    <Route path = '/pwa' exact component={PWA} />
                    <Route path = '/' component={UserAssigner} />
                </Switch>
            </BrowserRouter>
        </div>
    );
}

export default App;
