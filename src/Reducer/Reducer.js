import { SET_USER } from "../Reducer/Action";


export const initailState = {
    user: null,
}

 export const Reducer = (state, action) => {
    console.log("user:",action);
    switch (action.type) {
        case SET_USER:
            return{ ...state, user: action.user}
        
        default:
          return state;
    }
  
}


