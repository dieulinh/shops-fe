import {fetchTasksAsync, addTaskAsync, saveTaskWithUrl, setCurrentTask} from '../features/tasks/tasksSlice.js'
import {useSelector, useDispatch} from 'react-redux';
import { useEffect, useState } from "react";
import TaskDetails from "@/components/tasks/TaskDetails.jsx";
import AddEventButton from "@/components/tasks/AddEventButton.jsx";
import GoogleMeetEvent from "@/components/tasks/GoogleMeetEvent.jsx";

 function Tasks() {
   const dispatch = useDispatch()
   const [task,setTask] = useState({})

   // const tasks = useSelector((state) => state.tasks)
   const { tasks, error, status, newAdded, currentTask } = useSelector((state) => state.tasks);
   const handleSaveMeeting = (meetingUrl) => {
     console.log('save new added task with meeting url')
     dispatch(addTaskAsync({task: {text: task, meeting_url: meetingUrl} }))

     // dispatch(saveTaskWithUrl({...newAdded, meeting_url: meetingUrl}))
   }
   const selectCurrentTask = (task) => {
     dispatch(setCurrentTask(task))
   }
   const handleUpdateTask = (e) => {
     setTask(e.target.value)
   }
   const handleAddTask = (e) => {
     dispatch(addTaskAsync({task: {text: task} }))
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
        <div className={"form-actions flex"}>
          <button onClick={handleAddTask}>Add task</button>

          <GoogleMeetEvent title={task} saveMeeting={handleSaveMeeting}/>
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
        {currentTask && <TaskDetails task={currentTask}/>}
      </div>

    </>
  )
}
export default Tasks