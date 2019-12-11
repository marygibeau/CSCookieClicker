import { getToken } from "./config/Token";
import { getAxiosInstance } from "./config/Axios";

const axios = getAxiosInstance('/user');

export async function initializeTicketCount(name) {
    console.log("createTicketCount");
    // console.log(getToken())
    try {
        await axios.post(`/save`, {
            "name": name,
            "Authorization": "Bearer " + getToken(),
            "data": {
                "gameState": {
                    score: 0,
                    krisCount: 0,
                    krisCost: 5,
                    stottsCount: 0,
                    stottsCost: 50,
                    montekCount: 0,
                    montekCost: 100,
                    jeffayCount: 0,
                    jeffayCost: 1000,
                }
            }
        });
        return true;
    } catch (error) {
        return false;
    }
}

export async function quickSave(name, gameState) {
    try {
        await axios.post(`/save`, {
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

export async function readTicketCount(name) {
    // console.log("createTicketCount");
    // console.log(getToken())
    try {
        await axios.get(`/player`, { "Authorization": "Bearer " + getToken() });
        return true;
    } catch (error) {
        return false;
    }
}

export async function updateTicketCount(name) {
    // console.log("createTicketCount");
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

export async function deleteTicketCount(name) {
    // console.log("createTicketCount");
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
