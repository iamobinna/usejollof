import './styles/style.css';
import Switch from '@mui/material/Switch';

const Index = () => {
    return (
        <div className='user-setting'>
            <h4>Notification Setting</h4>
            <div className='switch'>
                <span>Recieve Notifications via E-mail</span> <Switch defaultChecked />
            </div>
            <div className='switch s1'>
                <span>Recieve Notifications via Messages</span> <Switch defaultChecked />
            </div>
        </div>
    )
}

export default Index
