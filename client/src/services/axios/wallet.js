import {URL} from '../../urls';
import axios from 'axios';

export const getWallet = async (userID) => {
    try {
        const userData = JSON.parse(localStorage.getItem('userData'));
        const {data} = await axios.get(`${URL}/wallet/get`, {
            headers:{
                'auth-token': userData.auth_token,
                'user-id' : userID? userID : userData.user._id
            }
        });

        console.log('data', data);
        return data;
    } catch (error) {
        //account creation had some error
        return null;
    }
}

export const addToWallet = async (amount) => {
    try {
        const userData = JSON.parse(localStorage.getItem('userData'));
        const {data} = await axios.get(`${URL}/wallet/add`, {
            headers:{
                'auth-token': userData.auth_token,
                'user-id' : userData.user._id,
                'user-funds': amount
            }
        });

        console.log('data', data);
        return data;
    } catch (error) {
        //account creation had some error
        return null;
    }
}


export const createWallet = async (accountType) => {
    try {
        const userData = JSON.parse(localStorage.getItem('userData'));
        const {data} = await axios.post(`${URL}/wallet/create`, {accountType, userID: userData.user._id} ,{
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

