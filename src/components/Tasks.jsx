import {fetchTasksAsync} from '../features/tasks/tasksSlice.js'
import {useSelector, useDispatch} from 'react-redux';
import {useEffect} from "react";

 function Tasks() {
   const dispatch = useDispatch()
   // const tasks = useSelector((state) => state.tasks)
   const { tasks, error, status } = useSelector((state) => state.tasks);

   useEffect(() => {
     if(status == 'ide') {
       dispatch(fetchTasksAsync())
     }

  },[dispatch,status])
  if(status == 'loading') {
    return <p>Is loading....</p>
  }
  if(status == 'failed') {return <div>Error: {error}</div>}
  return (
    <>
    <div>
    Task List</div>
      {tasks.length && tasks.map(task => (<div key={task.id}>{task.text}</div>))
      }

    </>
  )
}
export default Tasks