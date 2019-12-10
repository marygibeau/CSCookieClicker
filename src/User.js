import { getToken } from "./config/Token";
import { getAxiosInstance } from "./config/Axios";


export async function createTicketCount(name) {
    const axios = getAxiosInstance('/user');
    console.log("createTicketCount");
    // console.log(getToken())
    try {
        await axios.post(`/player`, {
            "name": name, 
            "Authorization": "Bearer " + getToken(), 
            "data": {
                "lifetimeTickets": 0,
                "currentTickets": 0
            }
        });
        return true;
    } catch (error) {
        return false;
    }
}
