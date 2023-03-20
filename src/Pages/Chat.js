import React,{useState, useEffect} from 'react';
import "../Components/Style.css";
import Avatar from '@mui/material/Avatar';
import  SearchOutlined  from "@mui/icons-material/SearchOutlined";
import  IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import InsertEmoticon from '@mui/icons-material/InsertEmoticon';
import Mic from '@mui/icons-material/Mic';
import AttachFile from '@mui/icons-material/AttachFile';
import SendIcon from '@mui/icons-material/Send';
import { 
    Navbar,
    NavItem,
    NavbarBrand,
    NavbarText,
    Input,
    Form,
    Button
 } from "reactstrap";
import { useParams } from "react-router-dom";
import db from "../firebase";
import {onSnapshot,doc,collection,orderBy, query, addDoc, serverTimestamp} from "firebase/firestore";
import {UserStatus  } from "../Context/StateProvider";



const Chat = () => {
    const [seed , setSeed] = useState("");
    const [input, setInput] = useState("");
    const {roomId} = useParams();
    const [roomName, setRoomName] = useState("");
    const [messages , setMessages] = useState([]);
    const {user} = UserStatus();

    const chats = async() => {
         if (roomId) {
           const unsub = onSnapshot(doc(db, "rooms", roomId), (doc) =>{
            // console.log("current data:", doc.data().name);
            setRoomName(doc.data().name)
           })
         
         }
    }
    //collection -> doc Id -> subcollection-> doc 
   const message = async() =>{
        if (roomId) {
          const collectionRef = collection(db, `rooms/${roomId}/messages`);
          const q = query(collectionRef, orderBy('timestsmp', 'asc'));
         onSnapshot(q, (querySnapshot) =>{
            // console.log(querySnapshot.docs.map((doc) =>doc.data()));
            setMessages(querySnapshot.docs.map((doc) =>doc.data()))
          })
        }
   }

   useEffect(() =>{
        message();
   },[roomId])

    useEffect( () =>{
        chats();
    },[roomId])

    useEffect(() =>{
        setSeed(Math.floor(Math.random() * 5000))
    },[roomId])

    const sendMessage = (e) =>{
        e.preventDefault();
        //  console.log("you try>>>", input);
        
        const data = addDoc(collection(db, `rooms/${roomId}/messages`),
        {
           message: input,
          name: user.displayName,
          timestsmp: serverTimestamp()
        })
       
  
        setInput("")
    }
  return (
    <div className="Chat_Section ">
       <Navbar className="border border-2 position-relative Chat_header ">
           <NavbarBrand className="  position-absolute   d-flex  w-50 h-100 ">
            <IconButton >
            <Avatar src={`https://avatars.dicebear.com/api/adventurer/${seed}.svg`}
  alt="avatar" />
            </IconButton>
            <NavbarText className="  w-75   mx-3" style={{fontSize:"10px" }}>
                  <h3 className=' text-dark  my-0'>{roomName} </h3>
                  <p>Last seen{""}
                  {new Date(messages[messages.length -1]?.timestsmp?.toDate()).toUTCString()}
                  </p> 
            </NavbarText>
           </NavbarBrand>
           
          <NavItem className=" d-flex justify-content-end mx-1 w-100  " >
                 <IconButton>
                     <SearchOutlined/>
                 </IconButton>
                 <IconButton>
                    <AttachFile/>
                 </IconButton>
                     <IconButton>
                        <MoreVertIcon/>  
                     </IconButton>
          </NavItem>  
       </Navbar>
        <NavItem className=" list-unstyled  Chat_body">
          {messages.map((message)=>(
            //message will be === to user message
             <p className={`chat_message ${message.name === user.displayName && "chat_reciever"}`}>

             <span className='Chat_Name'>{message.name}</span>
            {message.message}
             <span className="chat_timestamp">
                 {new Date(message.timestsmp?.toDate()).toUTCString()}
              </span>
           </p>
          )) 

          }
            {/* <p className={`chat_message ${true  && "chat_reciever"}`}>
               <span className='Chat_Name'>sonny</span>
               Hey Guys
               <span className="chat_timestamp">3:15pm</span>
             </p> */}
        </NavItem>

         <NavItem className="list-unstyled  footer_chat">
               <InsertEmoticon/>
               <Form className=" d-flex  ">
                  <Input 
                    value={input}
                    onChange={(e) =>
                    setInput(e.target.value)
                    } className='shadow-none m-2 ' type='text' placeholder='Message'/>
                <Button onClick={sendMessage} type="submit"><SendIcon /> </Button>   
               </Form>
               
              <Mic />
              
         </NavItem>
       </div>
  )
}

export default Chat;

// message: input,
//         name: user.displayName,
//         timestsmp: serverTimestamp()