import {fetchTasksAsync} from '../features/tasks/tasksSlice.js'
import {useSelector, useDispatch} from 'react-redux';
import {useEffect} from "react";

 function Tasks() {
   const dispatch = useDispatch()
   // const tasks = useSelector((state) => state.tasks)
   const { tasks, isLoading, error } = useSelector((state) => state.tasks);

   useEffect(() => {
    dispatch(fetchTasksAsync())
  },[dispatch])
  if(isLoading) {
    return <p>Is loading....</p>
  }
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