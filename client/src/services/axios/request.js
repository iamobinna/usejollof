import {URL} from '../../urls';
import axios from 'axios';

export const requestUpgrade = async (_data) => {
    try {
        const userData = JSON.parse(localStorage.getItem('userData'));
        const {data} = await axios.post(`${URL}/request/create`, {..._data, requestedBy: userData.user.email}, {
            headers:{
                'auth-token': userData.auth_token
            }
        });

        console.log('data', data);
        return 'requested';
    } catch (error) {
        //account creation had some error
        return null;
    }
}

//half work done do the frontend now

export const getUpgradeRequests = async () => {
    try {
        const userData = JSON.parse(localStorage.getItem('userData'));
        const {data} = await axios.get(`${URL}/request/getrequests`, {
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

export const getUpgradeRequestById = async (id) => {
    try {
        const userData = JSON.parse(localStorage.getItem('userData'));
        const {data} = await axios.get(`${URL}/request/getrequest-id`, {
            headers:{
                'auth-token': userData.auth_token,
                '_id' : id
            }
        });

        console.log('data', data);
        return data;
    } catch (error) {
        //account creation had some error
        return null;
    }
}

export const approveRequest = async (id, type) => {
    try {
        const userData = JSON.parse(localStorage.getItem('userData'));
        const {data} = await axios.put(`${URL}/request/approve`,{id, type} , {
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
export const rejectRequest = async (id) => {
    try {
        const userData = JSON.parse(localStorage.getItem('userData'));
        const {data} = await axios.get(`${URL}/request/reject`,{id} , {
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

