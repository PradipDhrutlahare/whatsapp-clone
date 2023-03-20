
import React,{useState} from "react";
import { Routes , Route } from "react-router-dom";
import './App.css';
// import Home from "./Pages/Home";
import Sidebar from "./Components/Sidebar";
import Chat from "./Pages/Chat";
import Login from "./Components/Login";
import { UserStatus  } from "./Context/StateProvider";

function App() {
  // const [user, setUser] = useState(null);
  const { user, dispatch} = UserStatus();
     
  return (
     <div className="app">  
       {!user ? (
        <Login/>
       ):(
        <div className="app_body"> 
        <Sidebar/>  
      <Routes>
        {/* <Route path="/" element={<Home/>}/> */}
        <Route path="/" element={<Chat/>}/> 
        <Route path="/rooms/:roomId" element={<Chat/>}/> 
        {/* <Route path="/rooms/:roomId/messages/:messageId" element={<Chat/>}/>  */}
      </Routes>
      </div>
       )}
 
    </div>
  );
}

export default App;
