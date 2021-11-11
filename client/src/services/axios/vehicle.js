import {URL} from '../../urls';
import axios from 'axios';

export const getVehicleByPartner = async (id) => {
    try {
        const userData = JSON.parse(localStorage.getItem('userData'));
        const {data} = await axios.get(`${URL}/vehicle/`, {
            headers:{
                'auth-token': userData.auth_token,
                'partner-email' : id? id : userData.user.email
            }
        });

        console.log('data', data);
        return data;
    } catch (error) {
        //account creation had some error
        return null;
    }
}

export const getVehicleByID = async (id) => {
    try {
        const userData = JSON.parse(localStorage.getItem('userData'));
        const {data} = await axios.get(`${URL}/vehicle/vehicle`, {
            headers:{
                'auth-token': userData.auth_token,
                'vehicle-id' : id
            }
        });

        console.log('data', data);
        return data;
    } catch (error) {
        //account creation had some error
        return null;
    }
}

export const getVehicleByDriver = async (id) => {
    try {
        const userData = JSON.parse(localStorage.getItem('userData'));
        const {data} = await axios.get(`${URL}/vehicle/`, {
            headers:{
                'auth-token': userData.auth_token,
                'driver-email' : id? id : userData.user.email
            }
        });

        console.log('data', data);
        return data;
    } catch (error) {
        //account creation had some error
        return null;
    }
}

export const addVehicle = async (vehicle) => {
    try {
        const userData = JSON.parse(localStorage.getItem('userData'));
        const {data} = await axios.post(`${URL}/vehicle/create`, {...vehicle, partner: userData.user.email}, {
            headers:{
                'auth-token': userData.auth_token
            }
        });

        console.log('data', data);
        return data;
    } catch (error) {
        //account creation had some error
        return null;
    }
}

export const removeVehicle = async (id) => {
    try {
        const userData = JSON.parse(localStorage.getItem('userData'));
        const {data} = await axios.delete(`${URL}/vehicle/`, {
            headers:{
                'auth-token': userData.auth_token,
                'vehicle-id': id
            }
        });

        console.log('data', data);
        return data;
    } catch (error) {
        //account creation had some error
        return null;
    }
}

export const updateVehicle = async (vehicle) => {
    try {
        const userData = JSON.parse(localStorage.getItem('userData'));
        const {data} = await axios.put(`${URL}/vehicle/update`, vehicle, {
            headers:{
                'auth-token': userData.auth_token
            }
        });

        console.log('data', data);
        return data;
    } catch (error) {
        //account creation had some error
        return null;
    }
}

