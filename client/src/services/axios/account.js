import {URL} from '../../urls';
import axios from 'axios';

export const signUp = async (_data)  => {
    try {
        const {data} = await axios.post(`${URL}/account/register`, _data);
        //account made
        console.log(data);
    } catch (error) {
        //account creation had some error
        return null;
    }
}