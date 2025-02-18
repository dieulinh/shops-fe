import './App.css'
import {Routes, Route} from 'react-router-dom';
import TaskList from "./components/Tasks.jsx";

const Home = () => <h1>Home Page</h1>;
const About = () => <h1>About Page</h1>;

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tasks" element={<TaskList />} />
        <Route path="/about" element={<About />} />
        {/*<Route path="/login" element={<Login />} />*/}
      </Routes>
    </div>
  );
};

export default App;
