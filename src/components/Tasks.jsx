import {fetchTasksAsync, addTaskAsync} from '../features/tasks/tasksSlice.js'
import {useSelector, useDispatch} from 'react-redux';
import {useEffect, useState} from "react";

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
     if(status == 'ide') {
       dispatch(fetchTasksAsync())
     }
  },[dispatch, status])
  if(status == 'loading') {
    return <p>Is loading....</p>
  }
  if(status == 'failed') {return <div>Error: {error}</div>}
  return (
    <>
      <input placeholder={'Input your task'} onBlur={handleUpdateTask}/>
      <div><button onClick={handleAddTask}>Add task</button></div>
      <div>
        Task List
      </div>
      {tasks.length && tasks.map((task) => (<div key={task.id}>{task.text}</div>))
      }

    </>
  )
}
export default Tasks