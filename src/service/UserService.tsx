import axios from 'axios'; 
import { Iuser } from './Interface';


const BOARD_API_BASE_URL = process.env.REACT_APP_SERVER_URL; 

export async function getUser(id:Number) {
    const data = await (await axios.get(BOARD_API_BASE_URL+"/member/" + id)).data;
    return data;
}

export async function createUser( user: Iuser){
    axios.post(BOARD_API_BASE_URL + "/member/", user);   
}

export async function getOneMemberFromUserId(id:Number) {
    const data =  await (await axios.get(BOARD_API_BASE_URL + "/member/" + id)).data
    return data
}

export async function updateUser(no:Number, user:Iuser){
    await axios.put(BOARD_API_BASE_URL + "/member/" + no, user);
}
