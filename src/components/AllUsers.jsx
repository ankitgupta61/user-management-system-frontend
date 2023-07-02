import { Table, TableHead, TableBody, TableRow, TableCell, styled, Button } from "@mui/material";
import {  useEffect, useState } from "react";
import { getUsers } from "../service/api";
import { Link } from "react-router-dom"
import { deleteUser } from "../service/api";
 
const StyledTable = styled(Table)`
    width : 90%;
    margin : 4% auto 0 auto;
`
const StyledTableHead = styled(TableHead)`
    background-color : #000000;
`
const StyledTableHeadElement = styled(TableCell)`
    color : #ffffff;
    font-size : 20px;
`

const AllUsers = () =>{
    const [ users, setUsers ] = useState([]);

    useEffect(()=>{
        const fetchData = async () => {
            try {
              const response = await getUsers();
            //   console.log(response);
              setUsers(response.data);
            } catch (error) {
              console.error('Error fetching data:', error);
            }
          };
          fetchData();
    },[]);

    const deleteHandler = async(id) =>{
       await deleteUser(id);
       window.location.reload();
    }

    return (
        <StyledTable>
            <StyledTableHead>
            <TableRow>
                <StyledTableHeadElement>S No</StyledTableHeadElement>
                <StyledTableHeadElement>Name</StyledTableHeadElement>
                <StyledTableHeadElement>User Name</StyledTableHeadElement>
                <StyledTableHeadElement>Email</StyledTableHeadElement>
                <StyledTableHeadElement>Phone Number</StyledTableHeadElement>
                <StyledTableHeadElement>Action</StyledTableHeadElement>
            </TableRow>
            </StyledTableHead>
            <TableBody>
            {users.map((item, index) => (
                <TableRow key={index} >
                <TableCell style={{fontSize : 18}}>{index+1}</TableCell>
                <TableCell style={{fontSize : 18}} >{item.name}</TableCell>
                <TableCell style={{fontSize : 18}}>{item.userName}</TableCell>
                <TableCell style={{fontSize : 18}}>{item.email}</TableCell>
                <TableCell style={{fontSize : 18}}>{item.phoneNumber}</TableCell>
                <TableCell>
                    <Button variant="contained" style={{marginRight : 10,}} component={Link} to={`/edit/${item.id}`} >Edit</Button>
                    <Button variant="contained" color="secondary" onClick={()=>{deleteHandler(item.id)}} >Delete</Button>
                </TableCell>
                </TableRow>
            ))}
            </TableBody>
        </StyledTable>
    )
}

export default AllUsers;