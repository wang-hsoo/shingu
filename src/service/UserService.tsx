import axios from 'axios'; 



const BOARD_API_BASE_URL = "http://localhost:8080/api"; 

export interface Iuser{
    no?: Number,
    studentid: String,
    username: String,
    password: String,
    divisioncode: String,
    darkmode?: Boolean
}

export async function getUser(id:Number) {
    const data = await (await axios.get(BOARD_API_BASE_URL+"/member/" + id)).data;
    return data;
}

export async function createUser( user: Iuser){
    axios.post(BOARD_API_BASE_URL + "/member/", user);   
}

export async function getOneMemberFromUserId(id:Number) {
    const data =  await (await axios.get(BOARD_API_BASE_URL + "/member" + "?id=" + id)).data
    return data
}

export async function updateUser(no:Number, user:Iuser){
    await axios.put(BOARD_API_BASE_URL + "/member/" + no, user);
}
