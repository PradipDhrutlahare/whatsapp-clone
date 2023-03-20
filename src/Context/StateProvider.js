import React,{createContext, useContext, useReducer} from 'react';
import { initailState, Reducer } from "../Reducer/Reducer";
const UserData = createContext();



const StateProvider = ({children}) => {
   const [state, dispatch] = useReducer(Reducer, initailState)
  return (
    <UserData.Provider value={{...state , dispatch}}>
        {children}
    </UserData.Provider>
  )
}

export const UserStatus = () =>{
    return useContext(UserData)
}

export { UserData, StateProvider};
