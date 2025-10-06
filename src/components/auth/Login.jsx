import React from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";

const GOOGLE_CLIENT_ID = "1021240766980-e50ibgd34ls3btd3pteki0tbr2g7j00f.apps.googleusercontent.com";

export default function Login() {
  const handleLoginSuccess = async (credentialResponse) => {
    try {
      const idToken = credentialResponse.credential; 
      console.log("Google ID Token:", idToken);

      // Send to your Rails backend
      const res = await fetch("http://localhost:3000/api/auth/google", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ access_token: idToken }),
      });

      const data = await res.json();

      if (res.ok) {
        console.log("User logged in:", data.user);
        // Optionally store app JWT for future requests
        localStorage.setItem("authToken", data.token);
        alert(`Welcome ${data.user.name}!`);
      } else {
        console.error("Login failed:", data.error);
        alert("Login failed. Please try again.");
      }
    } catch (err) {
      console.error("Error:", err);
    }
  };

  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <div className="flex flex-col items-center justify-center h-screen space-y-4">
        <h1 className="text-2xl font-semibold">Login with Google</h1>
        <GoogleLogin
          onSuccess={handleLoginSuccess}
          onError={() => console.log("Login Failed")}
        />
      </div>
    </GoogleOAuthProvider>
  );
}
