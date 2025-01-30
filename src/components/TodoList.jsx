import {useState, useEffect, useCallback} from "react";
import {useStore} from "../contexts/store";

export default function TodoList({title}) {
  const {state, addTodo} = useStore();
  const todos = state.todos.todos;
  const [task, setTask] = useState('');
  useEffect(() => {

  }, [todos]);


  return (
    <div>
      <input type="text" onChange={(e) => setTask(e.target.value)} />
      <button onClick={() => {addTodo(task); setTask('')}}>Add Todo</button>
      <div>
        <h1>{title}</h1>
        <ul>
          {todos.length && todos.map(todo => (
            <li key={todo}>
              {todo}

            </li>
          ))}
        </ul>
      </div>
    </div>
  )

}