import { useState } from "react";
import {useDispatch} from "react-redux";

import styles from "./ProductForm.module.css";
import {addProductAsync} from "@/features/products/productsSlice.js";

function ProductForm() {
  const dispatch = useDispatch()
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    stock: null,
    category: ''
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addProductAsync({product: formData}))
  }

  return <div className={"w-100"}>
    <h1>Add product</h1>
    <form className={"w-100"}>
      <div className={"form-control"}>
        <label htmlFor="name">Name</label>
        <input type="text" id="name" name={"name"} onChange={handleChange}/>
      </div>
      <div className={"form-control"}>
        <label htmlFor="category">Category</label>
        <input type="text" id="category" name={"category"} onChange={handleChange}/>
      </div>
      <div className="form-control">
        <label htmlFor="price">Price</label>
        <input type="number" id="price" name={"price"} onChange={handleChange}/>
      </div>
      <div className="form-control">
        <label htmlFor="stock">Stock</label>
        <input type="number" id="stock" name={"stock"} onChange={handleChange}/>
      </div>
      <div className="form-control">
        <label htmlFor="description">Description</label>
        <textarea id="description" name={"description"} onChange={handleChange}/>
      </div>
      <button type="submit" onClick={handleSubmit} className={"primary-button"}>Submit</button>
    </form>

  </div>
}

export default ProductForm