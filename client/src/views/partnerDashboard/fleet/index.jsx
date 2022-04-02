import './styles/style.css';
import CommuteIcon from '@mui/icons-material/Commute';
import Table from '../../../components/table';
import { useState, useEffect, useRef } from 'react';
import CancelIcon from '@mui/icons-material/Cancel';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Button, TextField } from '@mui/material';
import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Alert from '@mui/material/Alert';
import { getVehicleByPartner, addVehicle, updateVehicle, getVehicleByID } from '../../../services/axios/vehicle';
import {createDeliveryBoy, deleteDeliveryBoy, getDeliveryBoy, getDeliveryBoys, updateDeliveryBoy} from '../../../services/axios/delivery';
import avatar from '../../../static/images/avatar.jpg';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import ImageInContainer from '../../../components/imageInContainer';


const PopUp = ({id, setID, vehicles, setVehicles, fetchData}) => {
        
    const [age, setAge] = useState('');
    const [driver, setDriver] = useState(null);
    const [first, setFirst] = useState(true);
    const [_vehicles, _setVehicles] = useState([])
    const [change, setChange] = useState(false);
    const [sending, setSending] = useState(false);
    const [alert, setAlert] = useState(null);
      
    const handleChange = (event) => {
          setAge(event.target.value);
        };

    const fetch = async () => {
        const data = await getDeliveryBoy(id);
        if(data){
            console.log('driver', data);
            setDriver(data);
            if(data.vehicle){
                setAge(data.vehicle);
            }
            setFirst(false);
        }
        let arr = [];
        // console.log(vehicles);
        for (let i = 0; i < vehicles.bikes.data.length; i++) {
            if(vehicles.bikes.data[i].driver && vehicles.bikes.data[i].driver !== null)
            {
                if(data.vehicle && data.vehicle === vehicles.bikes.data[i]._id){
                    arr.push(vehicles.bikes.data[i]);
                }
            }else{
                arr.push(vehicles.bikes.data[i]);
            }
        }
        for (let i = 0; i < vehicles.bicycles.data.length; i++) {
            if(vehicles.bicycles.data[i].driver && vehicles.bicycles.data[i].driver !== null)
            {
                if(data.vehicle && data.vehicle === vehicles.bicycles.data[i]._id){
                    arr.push(vehicles.bicycles.data[i]);
                }
            }else{
                arr.push(vehicles.bicycles.data[i]);
            }
        }
        for (let i = 0; i < vehicles.others.data.length; i++) {
            if(vehicles.others.data[i].driver && vehicles.others.data[i].driver !== null)
            {
                if(data.vehicle && data.vehicle === vehicles.others.data[i]._id){
                    arr.push(vehicles.others.data[i]);
                }
            }else{
                arr.push(vehicles.others.data[i]);
            }
        }
        // console.log('drop', arr);
        _setVehicles(arr);
    }

    useEffect(() => {
        fetch();
         // eslint-disable-next-line
    }, []);

    useEffect(() => {
        if(first){
            return;
        }
        setChange(true);
        // eslint-disable-next-line
    },[age]);

    const updateDriver = async () => {
        setSending(true);
        setAlert('Sending');
        let id = null;
        if( driver.vehicle && driver.vehicle !== null){
            //HAD A VEHICLE
            id = driver.vehicle;
        }
        
        const data = await updateDeliveryBoy({...driver, vehicle: age});
        let error = false;
        if(data){
            let currentVehicle = null, previousVehicle = null;
            for (let i = 0; i < _vehicles.length; i++) {
                if ( _vehicles[i]._id === age){
                    currentVehicle = _vehicles[i];
                }
                if(id && _vehicles[i]._id === id){
                    previousVehicle = _vehicles[i];
                }
            }

            const data_ = await updateVehicle({...currentVehicle, driver: driver.email});
            if(id){
                const _data = await updateVehicle({...previousVehicle, driver: null});
                if(_data){}else{error = true}
            }
            if(data_){
                fetchData();
            }else{error = true}
        }else{error = true}
        if(error){setAlert('There was some error')}else{setAlert('Updated')}
    }

    const deleteDriver = async () => {
        setSending(true);
        const delted = await deleteDeliveryBoy(driver._id);
        if(delted){
            setAlert('deleted');
            fetchData();
        }else{setAlert('There was some error deleting')}
    }
    
    if(!id)
    {
        return null;
    }

    return (
        <div className="pop-up-container">
            <div className="pop-up box">
                <CancelIcon className="close-btn" onClick={() => setID(null)} />
                {
                    alert &&
                    <Alert severity='info' >{alert}</Alert>
                }
                {
                    sending? <Button style={{marginTop: '20px'}} variant='outlined' onClick = {() => setID(null)} >Okay</Button>:
                    <>
                        <div className="pop-up-upper">
                            <div className="pop-up-col1">
                                <span>Name</span>
                                <span>Phone Number</span>
                                <span>E-mail</span>
                                <span>Gender</span>
                            </div>
                            <div className="pop-up-col1">
                                <span>{driver?.name}</span>
                                <span>{driver?.phoneNumber}</span>
                                <span>{driver?.email}</span>
                                <span>{driver?.gender}</span>
                            </div>
                        </div>
                        <FormControl style={{
                            marginTop: '20px'
                        }} >
                            <InputLabel size='small' id="demo-simple-select-label">Vehicle</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={age}
                                label="Vehicle"
                                size='small'
                                onChange={handleChange}
                            >
                                {
                                    _vehicles.map((vehicle) => (
                                        <MenuItem key={vehicle._id} value={vehicle._id} >
                                        <div className='partner-fleet-menu-item flex' >
                                            <span>{vehicle.type}</span>
                                            <span>number: {vehicle.number}</span>
                                        </div>
                                        </MenuItem>
                                    ))
                                }
                            </Select>
                        </FormControl>
                        <div className="pop-up-buttons">
                            <Button variant='outlined' onClick={deleteDriver} >Remove Driver</Button>
                            {change && 
                                <Button onClick={updateDriver} variant='contained' >Confirm Change</Button>
                            }
                        </div>
                    </>
                }
            </div>
        </div>
    );
}

const PopUp3 = ({id, setID, vehicles, setVehicles}) => {
    const [_age, _setAge] = useState('');
    const [number, setNumber] = useState('');
    const [areaCode, setAreaCode] = useState('');
    const [sending, setSending] = useState(false);
    const [res, setRes] = useState({
        msg:'loading',
        type: ''
    });

    const _handleChange = (event) => {
        _setAge(event.target.value);
      };
    
    if(!id)
    {
        return null;
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        setSending(true);
        const vehicle = await addVehicle({
            number: areaCode + '' + number,
            type: _age
        });

        if(vehicle){
            setRes({type: 'success', msg: 'Vehicle Added'});
            let obj = vehicles;
            obj[`${_age + 's'}`] = {data : obj[`${_age + 's'}`].data.push(vehicle), total: obj[`${_age + 's'}`].total + 1, unUsed: obj[`${_age + 's'}`].unUsed + 1};
            // console
            setVehicles(obj);
        }else{
            setRes({type: 'error', msg: 'There was some error'});
        }
    }
    //BACKEND WAS DONE FOR DELIVERYBOY ACCOUNTS AND VEHICLES DO FRONTEND NOW
    const _vehicles = ['bike', 'bicycle', 'other'];

    return (
        <div className="pop-up-container">
            <div className="pop-up box">
                {
                    sending?
                    <>
                     <Alert severity={res.type === 'error'? 'error': 'success'}>{res.msg}</Alert>
                     {res.type !== '' &&
                        <Button style={{marginTop: '20px'}} onClick={() => setID(null)} variant='outlined' >{res.type === 'error'? 'okay': 'great'}</Button>
                     }
                    </>
                     :
                    <>
                        <CancelIcon className="close-btn" onClick={() => setID(null)} />
                        <form onSubmit={submitHandler} style={{display: 'flex', flexDirection: 'column', rowGap: '10px'}}>
                            <div className="flex">
                                <TextField value={areaCode} onChange={e => setAreaCode(e.target.value)} required label='Area code' size='small' />
                                <TextField value={number} onChange={e => setNumber(e.target.value)} required label='Vehicle number' type='number' size='small' />
                            </div>
                            <FormControl >
                                <InputLabel value size='small' id="demo-simple-select-label">Vehicle Type</InputLabel>
                                <Select
                                    required
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={_age}
                                    label="Vehicle Type"
                                    size='small'
                                    onChange={_handleChange}
                                >
                                {
                                    _vehicles.map((vehicle) => (
                                        <MenuItem key={vehicle} value={vehicle} >
                                        <div className='partner-fleet-menu-item flex' >
                                            <span>{vehicle}</span>
                                        </div>
                                        </MenuItem>
                                    ))
                                }
                                </Select>
                            </FormControl>
                            <Button type='submit' style={{marginTop: '10px'}} variant='outlined' >Add vehicle</Button>
                        </form>
                    </>
                }
            </div>
        </div>
    );
}

const PopUp2 = ({id, setID, drivers, setDrivers}) => {
    const [_age, _setAge] = useState('');
    const [match, setMatch] = useState(true);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [profileImage, setProfileImage] = useState(null);
    const [sendProfileImage, setSendProfileImage] = useState(null);
    const [number, setNumber] = useState('');
    const [alert, setAlert] = useState(null);
    const [sending, setSending] = useState(false);
    const imageRef = useRef(null);
    const _handleChange = (event) => {
          _setAge(event.target.value);
        };

        //INPUTS SET NOW DO THE SINGUP FUNCTIONALITY

    const _vehicles = ['male', 'female', 'prefer not to say'];

    // const [age, setAge] = useState('');

    const handleClick = () => {
        imageRef.current.click();
    }

    const imageHandler = (e) => {
        if(e.target.files[0])
        {
            setSendProfileImage(e.target.files[0]);
            const reader = new FileReader();
            reader.onload = () => {
                if(reader.readyState === 2){
                    setProfileImage(reader.result);
                    setAlert(null);
                }
            }
            reader.readAsDataURL(e.target.files[0]);
        }
    }
    
    const [values, setValues] = React.useState({
        password: '',
        showPassword: false,
      });
    const [_values, _setValues] = React.useState({
        password: '',
        showPassword: false,
      });
        
          const handleChange_ = (prop) => (event) => {
            setValues({ ...values, [prop]: event.target.value });
            if(!match || _values.password !== ''){
                if(event.target.value === _values.password){
                    setMatch(true);
                }else{
                    setMatch(false);
                }
            }
          };
        
          const handleClickShowPassword = () => {
            setValues({
              ...values,
              showPassword: !values.showPassword,
            });
          };
          const handleChange1 = (prop) => (event) => {
            _setValues({ ..._values, [prop]: event.target.value });
            if(event.target.value === values.password){
                setMatch(true);
            }else{
                setMatch(false);
            }
          };
        
          const handleClickShowPassword1 = () => {
            _setValues({
              ..._values,
              showPassword: !_values.showPassword,
            });
          };
        
          const handleMouseDownPassword = (event) => {
            event.preventDefault();
          };

    const submitHandler = async (e) => {
        e.preventDefault();
        if(sendProfileImage === null){
            setAlert('Add profile Image');
        }
        else{
            setSending(true);
            const userData = JSON.parse(localStorage.getItem('userData'));
            const fd = new FormData();
            fd.append('image', sendProfileImage);
            fd.append('user', name);
            fd.append('email', email);
            fd.append('password', values.password);
            fd.append('phoneNumber', number);
            fd.append('gender', _age);
            fd.append('partner', userData.user.email);
            const data = await createDeliveryBoy(fd);
            if(data){
                setAlert('Account Made');
                setDrivers(drivers => [...drivers, data]);
                console.log(data);
            }else{
                setAlert('There was some error');
            }
        }
    }
    
    if(!id)
    {
        return null;
    }
    
    return (
        <div className="pop-up-container">
            <div className="pop-up box">
                <CancelIcon className="close-btn" onClick={() => setID(null)} />
                {alert &&
                <Alert style={{marginBottom: '20px'}} severity='info' >{alert}</Alert>
                }
                {
                    sending?
                    <>
                        <Button variant='outlined' onClick={() => setID(null)} >Close</Button>
                    </>:
                    <form onSubmit={submitHandler} style={{display: 'flex', flexDirection: 'column', rowGap: '10px'}}>
                        <div className="image-uploader" onClick={() => handleClick()}>
                            <ImageInContainer imageSrc={profileImage? profileImage : avatar} />
                            {/* <img src={ profileImage? profileImage : avatar} alt='' /> */}
                                <div className='info' >
                                    <PhotoCameraIcon/> 
                                    <span>upload image</span>
                                </div>
                                <input ref={imageRef} onChange={imageHandler} type="file"rea name="" id="" accept="image/*" />
                        </div>
                        <TextField value={name} onChange={e => setName(e.target.value)} required label='Name' size='small' />
                        <TextField value={email} onChange={e => setEmail(e.target.value)} required label='E-mail' type='email' size='small' />
                        <TextField value={number} onChange={e => setNumber(e.target.value)} required label='Phone Number' type='number' size='small' />
                        <FormControl variant="outlined">
                            <InputLabel size='small' htmlFor="outlined-adornment-password">Password</InputLabel>
                            <OutlinedInput
                                required
                                id="outlined-adornment-password"
                                type={values.showPassword ? 'text' : 'password'}
                                value={values.password}
                                onChange={handleChange_('password')}
                                size='small'
                                endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                    >
                                    {values.showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                                }
                                label="Password"
                            />
                        </FormControl>
                        <FormControl variant="outlined">
                            <InputLabel size='small' htmlFor="outlined-adornment-password">{match? "Confirm Password" : 'Passwords Do not match'}</InputLabel>
                            <OutlinedInput
                                required
                                error = {match? false: true}
                                id="outlined-adornment-password"
                                type={_values.showPassword ? 'text' : 'password'}
                                value={_values.password}
                                onChange={handleChange1('password')}
                                size='small'
                                endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword1}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                    >
                                    {_values.showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                                }
                                label='Confirm Password'
                            />
                        </FormControl>
                        <FormControl>
                            <InputLabel size='small' id="demo-simple-select-label">Gender</InputLabel>
                            <Select
                                required
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={_age}
                                label="Gender"
                                size='small'
                                onChange={_handleChange}
                            >
                            {
                                _vehicles.map((vehicle) => (
                                    <MenuItem key={vehicle} value={vehicle} >
                                    <div className='partner-fleet-menu-item flex' >
                                        <span>{vehicle}</span>
                                    </div>
                                    </MenuItem>
                                ))
                            }
                            </Select>
                        </FormControl>
                        <Button type='submit' style={{marginTop: '10px'}} variant='outlined' > generate account </Button>
                    </form>
                }
            </div>
        </div>
    );
}

const Index = () => {
    const [id, setID] = useState(null);
    const [id_, setID_] = useState(null);
    const [_id, _setID] = useState(null);
    const columns = [
        {id: 'name', label: 'Driver', minWidth: ''},
        {id: 'email', label: 'E-mail', minWidth: ''},
        {id: 'gender', label: 'Gender', minWidth: ''},
        {id: 'phoneNumber', label: 'Phone Number', minWidth: ''},
        {id: 'vehicleNumber', label: 'Vehicle', minWidth: ''},
    ];

    const [rows, setRows] = useState([]);
    const [vehicles, setVehicles] = useState({
        bikes:{
            total:0,
            unUsed:0,
            data:[]
        },
        bicycles: {
            total:0,
            unUsed:0,
            data:[]
        },
        others: {
            total:0,
            unUsed:0,
            data:[]
        }
    });

    const fetch = async () => {
        const data = await getVehicleByPartner();
        // console.log('vehicles all', data);
        let bikes = [], bicycles = [], other = [];
        let nBikes = 0, nBicycles = 0, nOther = 0;
        let tBikes = 0, tBicycles = 0, tOther = 0;
        if(data){
            for (let i = 0; i < data.length; i++) {
                if(data[i].type === 'bike'){
                    tBikes++;
                    bikes.push(data[i]);
                    if(data[i].driver && data[i].driver !== null){}
                    else
                        nBikes++;
                }else if(data[i].type === 'bicycle'){
                    
                    tBicycles++;
                    bicycles.push(data[i]);
                    if(data[i].driver && data[i].driver !== null){}
                    else
                        nBicycles++;
                }else if(data[i].type === 'other'){
                    tOther++;
                    other.push(data[i]);
                    if(data[i].driver && data[i].driver !== null){}
                    else
                        nOther++;
                }
                
            }
            setVehicles({
                bikes:{
                    total:tBikes,
                    unUsed:nBikes,
                    data:bikes
                },
                bicycles: {
                    total:tBicycles,
                    unUsed:nBicycles,
                    data:bicycles
                },
                others: {
                    total:tOther,
                    unUsed:nOther,
                    data:other
                }
            })
        }

        let boys = await getDeliveryBoys();
        for (let i = 0; i < boys.length; i++) {
            if(boys[i].vehicle && boys[i].vehicle !== null){
                const vehicle = await getVehicleByID(boys[i].vehicle);
                if(vehicle)
                    boys[i].vehicleNumber = vehicle.number;
            }
        }
        setRows(boys);
        console.log('boys', boys);
    }

    useEffect(() => {
        fetch();
    }, []);

    const clickHandler = (id) => {
        setID(id);
    }

    return (
        <div className="partner-fleet fit">
            {id && 
            <PopUp fetchData = {fetch} vehicles={vehicles} setVehicles={setVehicles} id={id} setID={setID} />
            }
            {_id &&
            <PopUp2 drivers={rows} setDrivers={setRows} vehicles={vehicles} setVehicles={setVehicles} id={_id} setID={_setID} />
            }
            {id_ &&
            <PopUp3 vehicles={vehicles} setVehicles={setVehicles} id={id_} setID={setID_} />
            }
            <div className="card">
                <div className='partner-row1'>
                    <div className="partner-col1">
                        <h5>Current Bicycles</h5>
                        <h5>Current Motorcycles</h5>
                        <h5>Current other Vehicles</h5>
                    </div>
                    <div className="partner-col1">
                        <span>{vehicles.bicycles.total}</span>
                        <span>{vehicles.bikes.total}</span>
                        <span>{vehicles.others.total}</span>
                    </div>
                </div>
                <div className='partner-row1'>
                    <div className="partner-col1">
                        <h5>Bicycles not in use</h5>
                        <h5>Motorcycles not in use</h5>
                        <h5>Other vehicles not in use</h5>
                    </div>
                    <div className="partner-col1">
                        <span>{vehicles.bicycles.unUsed}</span>
                        <span>{vehicles.bikes.unUsed}</span>
                        <span>{vehicles.others.unUsed}</span>
                    </div>
                </div>
            </div>
            <div className='button button-2 v fit' onClick={() => setID_(1)} >
                <h4 className="button-text">Add Vehicle</h4>
                <CommuteIcon className='button-icon'/>
            </div>
            <h3>Drivers</h3>
            <div className='button button-2 v fit' onClick={() => _setID(1)} >
                <h4 className="button-text">Add Driver</h4>
                <CommuteIcon className='button-icon'/>
            </div>
            <div className="card">
                <Table rows={rows} columns = {columns} clickHandler={clickHandler} />
            </div>
        </div>
    )
}

export default Index
