import {URL} from '../../urls';
import axios from 'axios';

export const updateCategories = async (_data) => {
    try {
        const userData = JSON.parse(localStorage.getItem('userData'));
        const {data} = await axios.put(`${URL}/category/update`, _data, {
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

export const getCategories = async (id) => {
    try {
        const userData = JSON.parse(localStorage.getItem('userData'));
        const {data} = await axios.get(`${URL}/category/get`, {
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