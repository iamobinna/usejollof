import {URL} from '../../urls';
import axios from 'axios';

export const driverLogin = async (credentials) => {
    try {
        const {data} = await axios.post(`${URL}/deliveryboy/login`,credentials );
        localStorage.setItem('driverData', JSON.stringify(data));
        window.dispatchEvent( new Event('update-driver-account'));
        return data;
    } catch (error) {
        //account creation had some error
        return null;
    }
}