import {useState, useEffect} from 'react';
import './styles/style.css';
import Table from '../../../components/table';
import { getUpgradeRequests, getUpgradeRequestById, approveRequest, rejectRequest } from '../../../services/axios/request';
import GoogleMap from '../../../components/GoogleMap';
import DeleteIcon from '@mui/icons-material/Delete';
import ShareIcon from '@mui/icons-material/Share';
import CancelIcon from '@mui/icons-material/Cancel';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';

const PopUp = ({id, setID, applications, setApplications}) => {

    const [data, setData] = useState();

    const fetch = async () => {
        let _data = await getUpgradeRequestById(id);
        const dateObj = new Date(_data.created);
        let myDate = (dateObj.getUTCFullYear()) + "/" + (dateObj.getMonth() + 1)+ "/" + (dateObj.getUTCDate());
        _data.created = myDate;

        setData(_data)
    }

    useEffect(() => {
        fetch();
    },[])

    if(!id)
    {
        return null;
    }

    const approve = async () => {
        const _data = await approveRequest(id, data?.requestedFor);
        if(_data)
        {
            //remove from list
            let arr = [...applications];
            const index = arr.find( app => app._id === id);
            arr.splice(index, 1);
            setApplications(arr);
            //close pop up
            setID(null);
        }
        else{
            //error
        }
    }

    const reject = async () => {
        const data = await approveRequest(id);
        if(data)
        {
            //remove from list
            let arr = [...applications];
            const index = arr.find( app => app._id === id);
            arr.splice(index, 1);
            setApplications(arr);
            //close pop up
            setID(null);
        }
        else{
            //error
        }
    }

    return(
        <div className="pop-up-container">
            <div className="pop-up box">
                <CancelIcon className='close-btn' onClick = {() => setID(null)} />
                <div className="pop-up-upper" style={{
                    marginBottom: '10px'
                }} >
                    <div className="pop-up-col1">
                        <span>Requested For</span>
                        <span>Requested By</span>
                        <span>Requested On</span>
                        <span>Store Name</span>
                        <span>Wants to open store at</span>
                    </div>
                    <div className="pop-up-col1">
                        <span>{data?.requestedFor}</span>
                        <span>{data?.requestedBy}</span>
                        <span>{data?.created}</span>
                        <span>{data?.name}</span>
                    </div>
                </div>
                <GoogleMap onlyMap={true} eLocation={data?.location.latLng} />
                <div className="pop-up-buttons">
                    <div className='button button-hover' onClick={approve} >
                        <div className="button-bg" style={{background: 'rgb(0,150,100)', zIndex: '0'}} ></div>
                        <h4 className="button-text" style={{position: 'relative'}}>Approve</h4>
                        <ThumbUpIcon className='button-icon' style={{position: 'relative'}}/>
                    </div>
                    <div className='button button-hover' onClick = {reject} >
                        <div className="button-bg" style={{background: 'rgb(255, 20, 20)', zIndex: '0'}} ></div>
                        <h4 className="button-text" style={{position: 'relative'}} >Reject</h4>
                        <ThumbDownAltIcon className='button-icon' style={{position: 'relative'}}/>
                    </div>
                </div>
            </div>
        </div>
    )
}


const Index = () => {

    const applicationColumns = [
        {id: 'requestedBy', label: 'Name', minWidth: ''},
        {id: 'requestedFor', label: 'Requested For', minWidth: ''},
        {id: 'name', label: 'Store Name', minWidth: ''},
        {id: 'created', label: 'Submission Date', minWidth: ''},
    ];

    const [id, setID] = useState(null);

    const clickHandler = (id) => {
        setID(id);
    }

    const [applications, setApplications] = useState([]);

    useEffect( () => {
        fetch()
    }, []);
    
    async function fetch(){
        let data = await getUpgradeRequests();
        if(data){
            for (let i = 0; i < data.length; i++) {
                const dateObj = new Date(data[i].created);
                let myDate = (dateObj.getUTCFullYear()) + "/" + (dateObj.getMonth() + 1)+ "/" + (dateObj.getUTCDate());
                data[i].created = myDate;
            }
            setApplications(data);
        }
    }

    return (
        <div className='admin-users' >
            <div className="card">
                <Table columns={applicationColumns} clickHandler={clickHandler} rows={applications} />
            </div>
            {
                id &&
                <PopUp id={id} setID={setID} applications={applications} setApplications={setApplications} />
            }
            
        </div>
    )
}

export default Index
