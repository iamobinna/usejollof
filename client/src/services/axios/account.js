import {URL} from '../../urls';
import axios from 'axios';

export const signUp = async (_data)  => {
    try {
        const {data} = await axios.post(`${URL}/account/register`, _data);
        //account made
        localStorage.setItem('userData', JSON.stringify(data));
        return (data);
    } catch (error) {
        //account creation had some error
        return null;
    }
}

export const signIn = async (_data)  => {
    try {
        const {data} = await axios.post(`${URL}/account/login`, {email: _data.email, password:_data.password});
        //account made
        console.log('data', data);
        localStorage.setItem('userData', JSON.stringify(data));
        return 'logged in';
    } catch (error) {
        //account creation had some error
        return null;
    }
}

// export const updateLocation = async (_data) => {
//     try {
//         let userData = JSON.parse(localStorage.getItem('userData'));
//         userData.user.locations = _data;
//         const {data} = await axios.post(`${URL}/account/update`, userData.user, {
//             headers:{
//                 'auth-token': userData.auth_token
//             }
//         });
//         //account made
//         console.log('data', data);
//         localStorage.setItem('userData', JSON.stringify({...userData, user: data}));
//         window.dispatchEvent( new Event('update-account'));
//         return 'logged in';
//     } catch (error) {
//         //account creation had some error
//         return null;
//     }
// }

export const updateBrowser = async () => {
    try {
        const userData = JSON.parse(localStorage.getItem('userData'));
        console.log('user', userData);
        const {data} = await axios.get(`${URL}/account/get`, {
            headers:{
                'auth-token': userData.auth_token,
                'user-id': userData.user._id
            }
        });
        localStorage.setItem('userData', JSON.stringify({...userData, user: data}));
        window.dispatchEvent( new Event('update-account'));
        return 'logged in';
    } catch (error) {
        //account creation had some error
        return null;
    }
}

export const signOut = () => {
    localStorage.removeItem('userData');
    window.dispatchEvent( new Event('sign-out'));
}