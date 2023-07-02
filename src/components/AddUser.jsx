import { FormGroup, InputLabel, Input, FormControl, Button, styled, Typography } from "@mui/material";
import { useState } from 'react';
import { postData } from "../service/api"
import { useNavigate } from "react-router-dom";

const Container = styled(FormGroup)`
    width : 50%;
    margin : 5% auto 0 auto;
    & > div {
        margin-top : 20px;
    }
`

const initialUserData = {
    name : '',
    userName : '',
    email : '',
    phoneNumber : ''
}

const AddUsers = () =>{
    const navigate = useNavigate();
    const [ userData, setUserData] = useState(initialUserData);
    const changeHandler = (e) =>{
        setUserData({...userData,[e.target.name] : e.target.value});
    }
    const addUserDetails = () =>{
        if(userData.name !== "" && userData.phoneNumber.length === 10 && userData.email.includes('@')){
            userData.id++;
            postData(userData);
            navigate('/all');
        }else if(userData.name === ""){
            alert('name can not be empty');
        }
        else if(! userData.email.includes('@')){
            alert('invalid email');
        }else{
            alert('phone number should be of length 10');
        }
    }
    return (
        <Container>
            <Typography variant="h4">Add User</Typography>
            <FormControl>
                <InputLabel htmlFor="name-input">Name</InputLabel>
                <Input id="name-input" onChange={(e)=>{changeHandler(e)}} required name="name" />
            </FormControl>
            <FormControl>
                <InputLabel>UserName</InputLabel>
                <Input onChange={(e)=>{changeHandler(e)}} name='userName' />
            </FormControl>
            <FormControl>
                <InputLabel>Email</InputLabel>
                <Input onChange={(e)=>{changeHandler(e)}} name='email' type="email" />
            </FormControl>
            <FormControl>
                <InputLabel>PhoneNumber</InputLabel>
                <Input onChange={(e)=>{changeHandler(e)}} name='phoneNumber' type="number" />
            </FormControl>
            <FormControl>
                <Button variant = "contained" onClick={addUserDetails}>Add User</Button>
            </FormControl>
        </Container>
    )
}

export default AddUsers;