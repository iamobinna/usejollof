import {URL} from '../../urls';
import axios from 'axios';

export const createDeliveryBoy = async (_data) => {
    try {
        const userData = JSON.parse(localStorage.getItem('userData'));
        const {data} = await axios.post(`${URL}/deliveryboy/register`, _data, {
            headers:{
                'auth-token': userData.auth_token,
            }
        });

        console.log('data', data);
        return data;
    } catch (error) {
        //account creation had some error
        return null;
    }
}

export const getDeliveryBoys = async () => {
    try {
        const userData = JSON.parse(localStorage.getItem('userData'));
        const {data} = await axios.get(`${URL}/deliveryboy/get`, {
            headers:{
                'auth-token': userData.auth_token,
                'partner-email': userData.user.email
            }
        });

        console.log('data', data);
        return data;
    } catch (error) {
        //account creation had some error
        return null;
    }
}

export const deleteDeliveryBoy = async (id) => {
    try {
        const userData = JSON.parse(localStorage.getItem('userData'));
        const {data} = await axios.delete(`${URL}/deliveryboy/`, {
            headers:{
                'auth-token': userData.auth_token,
                'driver-id': id
            }
        }); //CHECK ERROR

        console.log('data', data);
        return data;
    } catch (error) {
        //account creation had some error
        return null;
    }
}

export const getDeliveryBoy = async (id) => {
    try {
        const userData = JSON.parse(localStorage.getItem('userData'));
        const {data} = await axios.get(`${URL}/deliveryboy/get`, {
            headers:{
                'auth-token': userData.auth_token,
                'driver-id': id
            }
        });

        console.log('data', data);
        return data;
    } catch (error) {
        //account creation had some error
        return null;
    }
}

export const updateDeliveryBoy = async (boy) => {
    try {
        const userData = JSON.parse(localStorage.getItem('userData'));
        const {data} = await axios.put(`${URL}/deliveryboy/update`, boy, {
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