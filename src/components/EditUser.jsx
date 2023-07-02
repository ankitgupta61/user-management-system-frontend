import { FormGroup, InputLabel, Input, FormControl, Button, styled, Typography } from "@mui/material";
import { useEffect, useState } from 'react';
import { getSpecificUser,postEditedUserData } from "../service/api"
import { useNavigate, useParams } from "react-router-dom";

const Container = styled(FormGroup)`
    width : 50%;
    margin : 5% auto 0 auto;
    & > div {
        margin-top : 20px;
    }
`

const EditUser = () =>{
    const navigate = useNavigate();
    const [ userData, setUserData] = useState({});

    const { id } = useParams();

    const changeHandler = (e) =>{
        setUserData({...userData, [e.target.name] : e.target.value});
    }

    useEffect(()=>{
        const fetchData = async()=>{
            const specificUser = await getSpecificUser(id);
            // console.log(specificUser.data[0]);
            setUserData(specificUser.data[0]);
        }
        fetchData();
    },[id]);

    const editUserDetails = () =>{
        if(userData.name !== "" && userData.phoneNumber.length === 10 && userData.email.includes('@')){
            // console.log(userData);
            postEditedUserData(userData, id);
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
            <Typography variant="h4">Edit User</Typography>
            <FormControl>
                <InputLabel shrink={true} htmlFor="name-input">Name</InputLabel>
                <Input id="name-input" onChange={(e)=>{changeHandler(e)}} required name="name" value={userData.name} />
            </FormControl>
            <FormControl>
                <InputLabel shrink={true} >UserName</InputLabel>
                <Input onChange={(e)=>{changeHandler(e)}} name='userName' value={userData.userName} />
            </FormControl>
            <FormControl>
                <InputLabel shrink={true} >Email</InputLabel>
                <Input onChange={(e)=>{changeHandler(e)}} name='email' type="email" value={userData.email} />
            </FormControl>
            <FormControl>
                <InputLabel shrink={true}>PhoneNumber</InputLabel>
                <Input onChange={(e)=>{changeHandler(e)}} name='phoneNumber' type="number" value={userData.phoneNumber}/>
            </FormControl>
            <FormControl>
                <Button variant = "contained" onClick={editUserDetails}>Edit User</Button>
            </FormControl>
        </Container>
    )
}

export default EditUser;