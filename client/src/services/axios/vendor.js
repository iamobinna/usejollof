import {URL} from '../../urls';
import axios from 'axios';

export const getVendor = async (id) => {
    try {
        const userData = JSON.parse(localStorage.getItem('userData'));
        const {data} = await axios.get(`${URL}/vendor/get`, {
            headers:{
                'auth-token': userData.auth_token,
                'user-email' : userData.user.email
            }
        });

        console.log('data', data);
        return data;
    } catch (error) {
        //account creation had some error
        return null;
    }
}