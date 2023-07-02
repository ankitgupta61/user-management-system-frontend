import axios from 'axios';

const URL = "https://user-management-system-backend-z93b.onrender.com";

export const postData = (data) =>{
    try{
        axios.post(`${URL}/add`, data);
    }catch(error){
        console.log(`error while callling AddUser Api : ${error}`);
    }
}

export const getUsers = async() =>{
    try{
        return await axios.get(`${URL}/all`);
    }catch(error){
        console.log(`error while calling getUser API: ${error}`);
    }
}

export const getSpecificUser = async (id) =>{
    try{
        return await axios.get(`${URL}/${id}`);
    }catch(error){
        console.log(`error while calling getSpecificUser API : ${error}`);
    }
}

export const postEditedUserData = async (userData, id) =>{
    try{
        axios.post(`${URL}/edit/${id}`, userData);
    }catch(error){
        console.log(`error while callling AddUser Api : ${error}`);
    }
}

export const deleteUser = async (id)=>{
    try{
        axios.delete(`${URL}/delete/${id}`);
    }catch(error){
        console.log(`error while callling deletUser Api : ${error}`);
    }
}
