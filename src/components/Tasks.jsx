import {fetchTasksAsync, addTaskAsync} from '../features/tasks/tasksSlice.js'
import {useSelector, useDispatch} from 'react-redux';
import {useEffect, useState} from "react";
import AddEventButton from "@/components/tasks/AddEventButton.jsx";
import GoogleMeetEvent from "@/components/tasks/GoogleMeetEvent.jsx";

 function Tasks() {
   const dispatch = useDispatch()
   const [task,setTask] = useState({})
   // const tasks = useSelector((state) => state.tasks)
   const { tasks, error, status } = useSelector((state) => state.tasks);
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
      <input placeholder={'Input your task'} onBlur={handleUpdateTask}/>
      <div className={"flex "}>
        <button onClick={handleAddTask}>Add task</button>

        <AddEventButton title={task} />
        <GoogleMeetEvent title={task}/>
      </div>

      <div>
        Task List
      </div>
      <ul>
      {tasks.length && tasks.map((task) => (<li className="task-item" key={task.id}>{task.text}</li>))
      }
      </ul>

    </>
  )
}
export default Tasks