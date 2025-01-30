import {authReducer, authInitialState } from "./authReducer.js";
import {todoReducer, todoInitialState} from "./todoReducer.js";


export function rootReducer(state, action) {
  return {
    auth: authReducer(state.auth, action),
    todos: todoReducer(state.todos, action)
  };
}
export const initialState = {
  auth: authInitialState,
  todos: todoInitialState
}