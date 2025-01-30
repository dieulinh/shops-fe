export const todoInitialState = {
  todos: [],
  loading: true,
  error: null
}
export function todoReducer(state, action) {
  switch (action.type) {
    case 'GET_TODOS':
      return {
        ...state,
        todos: action.payload,
        loading: false,
        error: null
      }
    case 'ADD_TODO':
      return {
        ...state,
        todos: [action.payload, ...state.todos],
        loading: false,
        error: null
      }
    case 'DELETE_TODO':
      return {
        ...state,
        todos: state.todos.filter(todo => todo._id !== action.payload),
        loading: false,
        error: null
      }
    case 'UPDATE_TODO':
      return {
        ...state,
        todos: state.todos.map(todo => todo._id === action.payload._id ? action.payload : todo),
        loading: false,
        error: null
      }
    case 'TODO_ERROR':
      return {
        ...state,
        error: action.payload
      }
    default:
      return state
  }
}