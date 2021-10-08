import './styles/style.css';
import CommuteIcon from '@mui/icons-material/Commute';
import Table from '../../../components/table';

const Index = () => {
    return (
        <div className="partner-fleet fit">
            <div className="card">
                <div className='partner-row1'>
                    <div className="partner-col1">
                        <h5>Current Bicycles</h5>
                        <h5>Current Motorcycles</h5>
                        <h5>Current other Vehicles</h5>
                    </div>
                    <div className="partner-col1">
                        <span>4</span>
                        <span>5</span>
                        <span>1</span>
                    </div>
                </div>
                <div className='partner-row1'>
                    <div className="partner-col1">
                        <h5>Bicycles not in use</h5>
                        <h5>Motorcycles not in use</h5>
                        <h5>Other vehicles not in use</h5>
                    </div>
                    <div className="partner-col1">
                        <span>4</span>
                        <span>5</span>
                        <span>1</span>
                    </div>
                </div>
            </div>
            <div className='button button-2 v fit'>
                <h4 className="button-text">Add Vehicle</h4>
                <CommuteIcon className='button-icon'/>
            </div>
        </div>
    )
}

export default Index
