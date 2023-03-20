import React, { useEffect, useState } from 'react';
import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ChatIcon from '@mui/icons-material/Chat';
import  IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import  SearchOutlined  from "@mui/icons-material/SearchOutlined";
import  db  from "../firebase";
import "../Components/Style.css";
import SideChat from "./SideChat";
import { UserStatus } from "../Context/StateProvider";
import {
   Navbar,
   NavbarBrand,
   NavItem,
   Container,
   Input

  } from "reactstrap";

import {collection, getDocs } from "firebase/firestore";


 
const Sidebar = () => {
  const  [rooms, setRooms] = useState([]);
  const {user} = UserStatus();
  
const createRoom = async () =>{
  const querySnapshot = await getDocs(collection(db, "rooms"));
    setRooms(
     querySnapshot.docs.map((doc) =>({
           id:doc.id,
           data:doc.data()
     }))
    )
   return () =>{
     createRoom()
   }
}
   useEffect( () =>{
     createRoom();
   },[]);

  return (
<div className="side_bar">   
  <Navbar className="  py-0 border border-1  sidebar_container list-unstyled ">
       <NavbarBrand>
          <IconButton>
              <Avatar src={user.photoURL}/>
          </IconButton>
       </NavbarBrand>
           <NavItem >
                <IconButton>
                    <DonutLargeIcon/>
                </IconButton>
                <IconButton>
                     <ChatIcon/>
                </IconButton>
                 <IconButton>
                      <MoreVertIcon />
                 </IconButton>
           </NavItem>
</Navbar>
<NavItem  className="list-unstyled my-0 p-2 border border-1 bg-white" >
      <Container className="d-flex border rounded-4 bg-white " >
         <SearchOutlined className="mt-2" />
            <Input className=" border-0 shadow-none" type='text' placeholder="Search or start chat"></Input>
     </Container>
     
</NavItem>

<NavItem className=" list-unstyled border  py-0 bg-white user_profile">
           <SideChat addNewChat/>
           {
               rooms.map(room =>(
                    <SideChat key={room.id} id={room.id} name={room.data.name }/>
               ))
           }
          
       </NavItem>
 </div>    

  )
}

export default Sidebar;

