import {URL} from '../../urls';
import axios from 'axios';

export const createFood = async (_data) => {
    try {
        const userData = JSON.parse(localStorage.getItem('userData'));
        const {data} = await axios.post(`${URL}/food/create`, _data, {
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
