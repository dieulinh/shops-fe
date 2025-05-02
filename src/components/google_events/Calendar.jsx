import { useEffect, useState } from "react";
import { gapi } from "gapi-script";

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const API_KEY = process.env.GOOGLE_API_KEY;
const SCOPES = "https://www.googleapis.com/auth/calendar.events";

const GoogleCalendar = () => {
  const [events, setEvents] = useState([]);
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    const start = () => {
      gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"],
        scope: SCOPES,
      }).then(() => {
        const authInstance = gapi.auth2.getAuthInstance();
        setIsSignedIn(authInstance.isSignedIn.get());
        authInstance.isSignedIn.listen(setIsSignedIn);
      });
    }
    gapi.load("client:auth2", start);
  }, []);

  const handleSignIn = () => {
    gapi.auth2.getAuthInstance().signIn();
  };

  const handleSignOut = () => {
    gapi.auth2.getAuthInstance().signOut();
    setEvents([]);
  };

  const fetchEvents = async () => {
    const response = await gapi.client.calendar.events.list({
      calendarId: "primary",
      timeMin: new Date().toISOString(),
      maxResults: 10,
      singleEvents: true,
      orderBy: "startTime",
    });
    setEvents(response.result.items || []);
  };

  const createEvent = async () => {
    const event = {
      summary: "Meeting with React",
      start: {
        dateTime: new Date().toISOString(),
        timeZone: "America/New_York",
      },
      end: {
        dateTime: new Date(new Date().getTime() + 60 * 60 * 1000).toISOString(),
        timeZone: "local",
        // timeZone: "local","America/New_York",
      },
    };

    await gapi.client.calendar.events.insert({
      calendarId: "primary",
      resource: event,
    });

    fetchEvents();
  };

  return (
    <div>
      <h2>Google Calendar Integration</h2>
      {isSignedIn ? (
        <>
          <button onClick={handleSignOut}>Sign Out</button>
          <button onClick={fetchEvents}>Fetch Events</button>
          <button onClick={createEvent}>Create Event</button>

          <h3>Upcoming Events:</h3>
          <ul>
            {events.map((event) => (
              <li key={event.id}>
                {event.summary} - {event.start.dateTime || event.start.date}
              </li>
            ))}
          </ul>
        </>
      ) : (
        <button onClick={handleSignIn}>Sign in with Google</button>
      )}
    </div>
  );
};

export default GoogleCalendar;
