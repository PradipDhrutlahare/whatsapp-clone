import React, { useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import { 
   NavItem,
   NavbarText
} from "reactstrap";
import "../Components/Style.css";
import db from "../firebase";
import {collection, addDoc } from "firebase/firestore";
import { Link } from "react-router-dom";
import {onSnapshot, orderBy, query } from "firebase/firestore";


const SideChat = ({id, name, addNewChat}) => {
  const [seed , setSeed] = useState("");
  const [messages, setMessages] = useState("")
   
 useEffect(() =>{
    if (id) {
      const collectionRef = collection(db, `rooms/${id}/messages`);
          const q = query(collectionRef, orderBy('timestsmp', 'asc'));
         onSnapshot(q, (querySnapshot) =>{
            // console.log(querySnapshot.docs.map((doc) =>doc.data()));
            setMessages(querySnapshot.docs.map((doc) =>doc.data()))
          })
    } 

 },[])



  useEffect(() =>{
      setSeed(Math.floor(Math.random() * 5000))
  },[])
   
  const createChat = async() =>{
       const roomName = prompt("please enter name for chat");
        //add data in firestore
        if (roomName) {
        await addDoc(collection(db,"rooms"), {
           name: roomName,
        })
        }
  }
  //using Avatar dicebear.com 
  return (
    !addNewChat?(
      <Link  to={`/rooms/${id}`} className="room">
            <NavItem className="  d-flex  py-1 border px-4 py-1 list-unstyled side_chat">
          <Avatar src={`https://avatars.dicebear.com/api/adventurer/${seed}.svg`}
  alt="avatar" className="w-25" />
            <NavbarText className=' py-0 px-2'style={{fontSize:"10px" }}>
            <h5 className='text-dark'>{name}</h5>
            <p>{messages[0]?.message} </p>
            </NavbarText>
    </NavItem>
      </Link>
   
):(
   <NavItem onClick={createChat} className="sd-flex  py-1 border px-3 py-1 list-unstyled">
     <h1 className=" fs-4 text-center">Add new Chat</h1>
</NavItem>
)
  ) 
}

export default SideChat;
