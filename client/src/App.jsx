import "./app.css";
import SignIn from './views/SignIn';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import UserAssigner from './userAssigner.jsx';

function App() {

    return (
        <div>
            <BrowserRouter>
                <Switch>
                    <Route path = '/signin' exact component={SignIn} />
                    <Route path = '/' component={UserAssigner} />
                </Switch>
            </BrowserRouter>
        </div>
    );
}

export default App;
