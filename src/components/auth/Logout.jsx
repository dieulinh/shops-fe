const Logout = () => {
  const user = localStorage.getItem('access_token');
  if (user) {
    localStorage.removeItem('access_token');
    window.location.href = '/login';
  } else {
    window.location.href = '/login';
  }
  return null;

}
export default Logout;

