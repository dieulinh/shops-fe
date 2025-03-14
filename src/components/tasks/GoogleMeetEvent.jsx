import React, { useEffect, useState } from "react";
import { gapi } from "gapi-script";

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const API_KEY = process.env.GOOGLE_API_KEY;
const SCOPES = "https://www.googleapis.com/auth/calendar.events https://www.googleapis.com/auth/userinfo.email";

const GoogleMeetEvent = ({title,description='',saveMeeting}) => {
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    const initClient = () => {
      gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: [
          "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest",
          "https://www.googleapis.com/discovery/v1/apis/oauth2/v2/rest"
        ],
        scope: SCOPES,
      }).then(() => {
        console.log("Google API initialized");
      });
    };
    gapi.load("client:auth2", initClient);
  }, []);

  const handleAuth = () => {
    gapi.auth2.getAuthInstance().signIn().then(() => {
      getUserEmail();
      createGoogleMeetEvent();
    });
  };

  const getUserEmail = () => {
    const authInstance = gapi.auth2.getAuthInstance();
    const user = authInstance.currentUser.get();
    const profile = user.getBasicProfile();
    console.log("User email:", profile.getEmail());
    setUserEmail(profile.getEmail()); // Get and set user email
  };
  const createGoogleMeetEvent = () => {
    if (!userEmail) {
      alert("User email not found. Please sign in again.");
      return;
    }

    const event = {
      summary: title,
      description: description,
      start: {
        dateTime: new Date(Date.now() +24*3600000).toISOString(), // Meeting starts 1day from now
        timeZone: "America/Los_Angeles",
      },
      end: {
        dateTime: new Date(Date.now() + +24*3600000 + 3600000).toISOString(), // Ends in 1 hour
        timeZone: "America/Los_Angeles",
      },
      attendees: [{ email: userEmail }], // Use the authenticated user's email
      conferenceData: {
        createRequest: {
          requestId: "meeting-" + new Date().getTime(),
          conferenceSolutionKey: { type: "hangoutsMeet" },
        },
      },
    };

    gapi.client.calendar.events.insert({
      calendarId: "primary",
      resource: event,
      conferenceDataVersion: 1,
    }).then((response) => {
      const meetLink = response.result.conferenceData?.entryPoints?.[0]?.uri;
      if (meetLink) {
        alert(`Google Meet link: ${meetLink}`);
        saveMeeting(meetLink)

        // window.open(meetLink, "_blank");
      } else {
        alert("Failed to generate Meet link.");
      }
    }).catch((error) => {
      console.error("Error creating event:", error);
    });
  };

  return (
      <button onClick={handleAuth}>Generate Google Meet Event</button>
  );
};

export default GoogleMeetEvent;
