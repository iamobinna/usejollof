import io from "socket.io-client";
import { URL } from "../urls";

export const socket = io(URL, {
    query: {token: JSON.parse(localStorage.getItem('driverData'))?.auth_token}
});