import './App.css'
import Calendar from "./components/Calendar.jsx";
import {StoreProvider} from "./contexts/store.jsx";
import TodoList from "./components/TodoList.jsx";
function App() {

  return (
    <StoreProvider>
      <Calendar modal={"myModal"} />
      <TodoList title={"my todo list"}/>
    </StoreProvider>
  )
}
export default App