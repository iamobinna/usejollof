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