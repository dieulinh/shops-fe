import { gapi } from "gapi-script";


const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const API_KEY = process.env.GOOGLE_API_KEY;
const DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];
const SCOPES = "https://www.googleapis.com/auth/calendar.readonly";
 const initGoogleClient = () => {
  gapi.load("client:auth2", () => {
    gapi.client.init({
      apiKey: API_KEY,
      clientId: CLIENT_ID,
      discoveryDocs: DISCOVERY_DOCS,
      scope: SCOPES,
    });
  });
};
 const signInWithGoogle = async () => {
  const auth = gapi.auth2.getAuthInstance();

   const googleUser = await auth.signIn();
   let userData = null;
   if (googleUser) {
     const profile = googleUser.getBasicProfile();
     userData = {
       id: profile.getId(),
       name: profile.getName(),
       email: profile.getEmail(),
       profilePic: profile.getImageUrl(),
     };
   }
   localStorage.setItem('userData', JSON.stringify(userData));
   localStorage.setItem('user_email', userData?.email);
   localStorage.setItem('access_token', auth.currentUser.get().getAuthResponse().access_token);
   return {access_token: auth.currentUser.get().getAuthResponse().access_token, userData};
};
export { initGoogleClient, signInWithGoogle };