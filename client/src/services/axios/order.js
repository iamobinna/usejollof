import {URL} from '../../urls';
import axios from 'axios';

export const createOrder = async (_data) => {
    try {
        const userData = JSON.parse(localStorage.getItem('userData'));
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
        const userData = JSON.parse(localStorage.getItem('userData'));
        let headers = null;
        if(userData.user.type === 'user')
        {
            headers = {
                'auth-token': userData.auth_token,
                'user-email' : userData.user.email,
            }
        }else{
            headers = {
                'auth-token': userData.auth_token,
                'vendor-email' : userData.user.email,
            }
        }
        const {data} = await axios.get(`${URL}/order/`, {headers});

        console.log('data', data);
        return data;
    } catch (error) {
        //account creation had some error
        return null;
    }
}
export const updateOrder = async (order) => {
    try {
        const userData = JSON.parse(localStorage.getItem('userData'));
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