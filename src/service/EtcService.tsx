import axios from 'axios'; 

const BOARD_API_BASE_URL = process.env.REACT_APP_API_URL; 

export async function getAdmin() {
    const data = await (await axios.get(BOARD_API_BASE_URL+"/admin")).data;
    return data;
}

export async function getCategory() {
    const data = await (await axios.get(BOARD_API_BASE_URL+"/category")).data;
    return data;
}

export async function getDivision() {
    const data = await (await axios.get(BOARD_API_BASE_URL+"/division")).data;
    return data;
}