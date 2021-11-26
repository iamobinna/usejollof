import {URL} from '../urls';
import axios from 'axios';

export const createOrder = async (_data) => {
    try {
        const userData = JSON.parse(localStorage.getItem('driverData'));
        const {data} = await axios.post(`${URL}/order/create`, _data, {
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

export const getOrders = async () => {
    try {
        const userData = JSON.parse(localStorage.getItem('driverData'));
        const {data} = await axios.get(`${URL}/order/`, {headers:
            {
                'auth-token': userData.auth_token,
                'driver-id': userData.user._id
            }
        });

        console.log('data', data);
        return data;
    } catch (error) {
        //account creation had some error
        return null;
    }
}

export const getOrder = async (id) => {
    try {
        const userData = JSON.parse(localStorage.getItem('driverData'));
        const {data} = await axios.get(`${URL}/order/get`, {headers:
            {
                'auth-token': userData.auth_token,
                'order-id': id
            }
        });

        console.log('data', data);
        return data;
    } catch (error) {
        //account creation had some error
        return null;
    }
}


export const updateOrder = async (order) => {
    try {
        const userData = JSON.parse(localStorage.getItem('driverData'));
        const {data} = await axios.put(`${URL}/order/update`, order, {
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