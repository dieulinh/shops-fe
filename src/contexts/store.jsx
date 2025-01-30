import { createContext, useReducer, useContext } from 'react';
import { initialState, rootReducer } from './rootReducer';

const StoreContext = createContext();

export function  StoreProvider({children}) {
  const [state, dispatch] = useReducer(rootReducer, initialState);
  const login = (user) => {
    dispatch({type: 'LOGIN', payload: user})
  }
  const logout = () => {
    dispatch({type: 'LOGOUT'})
  }

 const addTodo = (todo) => {
    dispatch({type: 'ADD_TODO', payload: todo})
  }

  return (
    <StoreContext.Provider value={{state, login, logout, addTodo}}>
      {children}
    </StoreContext.Provider>
  )
}
export function useStore() {
  return useContext(StoreContext);
}