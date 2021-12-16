import {URL} from '../../urls';
import axios from 'axios';

export const getWallet = async (userID) => {
    try {
        const userData = JSON.parse(localStorage.getItem('userData'));
        const {data} = await axios.get(`${URL}/admin-wallet/get`, {
            headers:{
                'auth-token': userData.auth_token,
                'admin-pass': 'sahil1234',
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

export const updateWallet = async (wallet) => {
    try {
        const userData = JSON.parse(localStorage.getItem('userData'));
        const {data} = await axios.put(`${URL}/admin-wallet/update`, wallet, {
            headers:{
                'auth-token': userData.auth_token,
                'admin-pass': 'sahil1234'
            }
        });

        console.log('data', data);
        return data;
    } catch (error) {
        //account creation had some error
        return null;
    }
}

export const getWallets = async () => {
    try {
        const userData = JSON.parse(localStorage.getItem('userData'));
        const {data} = await axios.get(`${URL}/admin-wallet/`, {
            headers:{
                'auth-token': userData.auth_token,
                'admin-pass': 'sahil1234'
            }
        });

        console.log('data', data);
        return data;
    } catch (error) {
        //account creation had some error
        return null;
    }
}

export const getWalletRequests = async () => {
    try {
        const userData = JSON.parse(localStorage.getItem('userData'));
        const {data} = await axios.get(`${URL}/admin-wallet/requests`, {
            headers:{
                'auth-token': userData.auth_token,
                'admin-pass': 'sahil1234'
            }
        });

        console.log('data', data);
        return data;
    } catch (error) {
        //account creation had some error
        return null;
    }
}


