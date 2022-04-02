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
        return data;
    } catch (error) {
        //account creation had some error
        return null;
    }
}

export const getFoods = async () => {
    try {
        const userData = JSON.parse(localStorage.getItem('userData'));
        const {data} = await axios.get(`${URL}/food/getfoods`, {
            headers:{
                'auth-token': userData.auth_token,
                'email': userData.user.email
            }
        });
        return data;
    } catch (error) {
        //account creation had some error
        return null;
    }
}

export const getAllFoods = async () => {
    try {
        const userData = JSON.parse(localStorage.getItem('userData'));
        const {data} = await axios.get(`${URL}/food/get`, {
            headers:{
                'auth-token': userData.auth_token
            }
        });
        return data;
    } catch (error) {
        //account creation had some error
        return null;
    }
}

export const getFoodsLike = async (name) => {
    console.log(name);
    try {
        const userData = JSON.parse(localStorage.getItem('userData'));
        const {data} = await axios.get(`${URL}/food/get-like`, {
            headers:{
                'auth-token': userData.auth_token,
                'food-name': name
            }
        });
        return data;
    } catch (error) {
        //account creation had some error
        return null;
    }
}

export const deleteFood = async (id) => {
    try {
        const userData = JSON.parse(localStorage.getItem('userData'));
        //eslint-disable-next-line
        const {data} = await axios.delete(`${URL}/food/delete`, {
            headers:{
                'auth-token': userData.auth_token,
                'food-id': id
            }
        });
        return 'deleted';
    } catch (error) {
        //account creation had some error
        return null;
    }
}

export const getFood = async (id) => {
    try {
        const userData = JSON.parse(localStorage.getItem('userData'));
        const {data} = await axios.get(`${URL}/food/getfood`, {
            headers:{
                'auth-token': userData.auth_token,
                'food-id': id
            }
        });
        return data;
    } catch (error) {
        //account creation had some error
        return null;
    }
}