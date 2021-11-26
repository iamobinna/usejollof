import {URL} from '../../urls';
import axios from 'axios';

export const assignDeliveryBoy = async (vendorLatLng, orderID) => {
    try {
        const userData = JSON.parse(localStorage.getItem('userData'));
        const {data} = await axios.post(`${URL}/assign`,{vendorLatLng} ,{
            headers:{
                'auth-token': userData.auth_token,
                'order-id': orderID
            }
        });

        console.log('data', data);
        return data;
    } catch (error) {
        //account creation had some error
        return null;
    }
}