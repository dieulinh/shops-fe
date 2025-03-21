import {fetchTasksAsync, addTaskAsync, saveTaskWithUrl, setCurrentTask} from '../features/tasks/tasksSlice.js'
import {useSelector, useDispatch} from 'react-redux';
import { useEffect, useState } from "react";
import TaskDetails from "@/components/tasks/TaskDetails.jsx";

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const API_KEY = process.env.GOOGLE_API_KEY;
const SCOPES = "https://www.googleapis.com/auth/calendar.events https://www.googleapis.com/auth/userinfo.email";
import {gapi} from "gapi-script";

 function Tasks() {
   const dispatch = useDispatch()
   const [task,setTask] = useState({})
   const [joiners, setJoiners] = useState([])

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

     })
   };
   const onClose = () => {
     selectCurrentTask(null)
   }

   const getUserEmail = () => {
     const authInstance = gapi.auth2.getAuthInstance();
     const user = authInstance.currentUser.get();
     const profile = user.getBasicProfile();

     createGoogleMeetEvent(task, '', joiners, profile.getEmail())
   };
   const createGoogleMeetEvent = (title, description, joiners, userEmail) => {
     if (!userEmail) {
       return;
     }
     let joinerList = joiners.map((joiner) => ({ email: joiner }));

     const event = {
       summary: title,
       description: description||'',
       start: {
         dateTime: new Date(Date.now() +24*3600000).toISOString(), // Meeting starts 1day from now
         timeZone: "America/Los_Angeles",
       },
       end: {
         dateTime: new Date(Date.now() + +24*3600000 + 3600000).toISOString(), // Ends in 1 hour
         timeZone: "America/Los_Angeles",
       },
       attendees: [...joinerList, { email: userEmail } ], // Use the authenticated user's email
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
         dispatch(addTaskAsync({task: {text: title, meeting_url: meetLink, details: joiners.join(',')} }))

         // window.open(meetLink, "_blank");
       } else {
         alert("Failed to generate Meet link.");
       }
     }).catch((error) => {
       console.error("Error creating event:", error);
     });
   };

   // const tasks = useSelector((state) => state.tasks)
   const { tasks, error, status, newAdded, currentTask } = useSelector((state) => state.tasks);

   const handleAddJoiners = (e) => {
      setJoiners(e.target.value.split(','))
   }

   const selectCurrentTask = (task) => {
     dispatch(setCurrentTask(task))
   }
   const handleUpdateTask = (e) => {
     setTask(e.target.value)
   }
   const handleAddTask = (e) => {
     console.log(joiners.join(','))
     dispatch(addTaskAsync({task: {text: task, details: joiners.join(',')} }))
   }

   useEffect(() => {
     if(status == 'idle') {
       dispatch(fetchTasksAsync())
     }
  },[dispatch, status])

  if(status === 'loading') {
    return <p>Is loading....</p>
  }
  if(status === 'failed') {return <div>Error: {error}</div>}
  return (
    <>
      <div className={"container"}>
        <input placeholder={'Input your task'} onBlur={handleUpdateTask}/>
        <input type="text" id={"joiner"} onBlur={handleAddJoiners} placeholder={"Enter email's joiner separate by comma"}/>
        <div className={"form-actions flex"}>
          <button onClick={handleAddTask}>Add task</button>

          <button onClick={handleAuth}> Create Meeting Url</button>
        </div>
      </div>

      <div>
        Task List
      </div>
      <ul>
        {tasks.length && tasks.map((task) => (<li className="task-item" key={task.id}  onClick={() => selectCurrentTask(task)}>{task.text}</li>))
      }
      </ul>
      <div className={"task-detail-modal"}>
        {currentTask && <div id="myModal" className={'modal modal-open'}>
          <div className="modal-content">
            <span className="close" onClick={onClose}>&times;</span>
            <h2>Modal Title</h2>
            <TaskDetails task={currentTask}/>
          </div>
        </div>}

      </div>

    </>
  )
 }

export default Tasks