// import { useSelect } from "react";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {uploadPhotoAsync} from "@/features/products/productSlice.js";
function ProductPhotoForm() {
  const imageUrl = useSelector(state => state.product.image_url)
  const error = useSelector(state => state.product.error)
  const dispatch = useDispatch()
  const {id} = useParams();
  const formData = new FormData();

  const handleChange = (e) => {
    formData.append("photo[image]", e.target.files[0]);
    formData.append("product_id", id)
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('product Id',id)

    dispatch(uploadPhotoAsync(formData))
  }
  if(error) {
    return <div>{error}</div>
  }

  return <div className={"w-100"}>
    <h1>Add product</h1>
    {imageUrl && <img src={`http://localhost:3000/${imageUrl}`} alt="product" className={"w-100"} />}
    <form className={"w-100"}>
      <div className={"form-control"}>
        <label htmlFor="name">Name</label>
        <input type="file" id="name" name={"photo[image]"} accept="image/png, image/jpeg" onChange={handleChange}/>
      </div>

      <button type="submit" onClick={handleSubmit} className={"primary-button"}>Submit</button>
    </form>

  </div>
}

export default ProductPhotoForm