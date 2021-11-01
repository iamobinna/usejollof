import {URL} from '../../urls';
import axios from 'axios';

export const getLocations = async () => {
    try {
        const userData = JSON.parse(localStorage.getItem('userData'));
        const {data} = await axios.get(`${URL}/location/`, {
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

export const getLocation = async (id) => {
    try {
        const userData = JSON.parse(localStorage.getItem('userData'));
        const {data} = await axios.get(`${URL}/location/id`, {
            headers:{
                'auth-token': userData.auth_token,
                'location-id' : id
            }
        });

        console.log('data', data);
        return data;
    } catch (error) {
        //account creation had some error
        return null;
    }
}

export const deleteLocation = async (id) => {
    try {
        const userData = JSON.parse(localStorage.getItem('userData'));
        const {data} = await axios.delete(`${URL}/location/id`, {
            headers:{
                'auth-token': userData.auth_token,
                'location-id' : id
            }
        });

        console.log('data', data);
        return data;
    } catch (error) {
        //account creation had some error
        return null;
    }
}

export const updateLocation = async (location) => {
    try {
        const userData = JSON.parse(localStorage.getItem('userData'));
        const {data} = await axios.put(`${URL}/location/update`, location, {
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

export const addLocation = async (location) => {
    try {
        const userData = JSON.parse(localStorage.getItem('userData'));
        const {data} = await axios.post(`${URL}/location/create`, location, {
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