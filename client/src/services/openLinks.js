import {CLIENT_URL as URL} from '../urls';

export const openInAppLink = (url) => {
    window.open(`${URL}${url}`, "_self")
}