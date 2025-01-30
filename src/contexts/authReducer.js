export const authInitialState = {
  isAuthenticated: false,
  user: null,
  token: null,
  loading: true,

}
export function authReducer(state, action) {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token,
        loading: false,
      }
    case 'LOGOUT':
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        token: null,
        loading: false,
      }
    case 'LOADING':
      return {
        ...state,
        loading: true,
      }
    default:
      return state
  }
}