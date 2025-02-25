import './common.css'
import './App.css'

import {Routes, Route} from 'react-router-dom';
import TaskList from "./components/Tasks.jsx";
import Products from "@/components/Products.jsx";
import Layout from "@/layout/Layout.jsx";
import ProductForm from "@/components/products/ProductForm.jsx";
import ProductDetails from "@/components/products/ProductDetails.jsx";
import ProductPhotoForm from "@/components/products/ProductPhotoForm.jsx";

const Home = () => <h1>Home Page</h1>;
const About = () => <h1>About Page</h1>;

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/tasks" element={<TaskList />} />
          <Route path="/about" element={<About />} />
          <Route path={"/products"} element={<Products />} />
          <Route path={"/products/:id"} element={<ProductDetails />} />
          <Route path={"/products/:id/upload"} element={<ProductPhotoForm />} />
          <Route path={"/products/add"} element={<ProductForm />} />
        </Route>
        {/*<Route path="/login" element={<Login />} />*/}
      </Routes>
    </div>
  );
};

export default App;
