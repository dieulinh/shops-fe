import { fetchProductsAsync } from '@/features/products/productsSlice.js'
import {useSelector, useDispatch} from 'react-redux';
import {useEffect} from "react";
import ProductPreview from "@/components/ProductPreview.jsx";
import ProductForm from "@/components/products/ProductForm.jsx";
function Products(){
  const dispatch = useDispatch();
  const { products, error, status } = useSelector((state) => state.products)
  const saveProduct = (e) => {

    dispatch(addProduct(state,))
  }
  useEffect(() => {
    if(status === 'idle') {
      dispatch(fetchProductsAsync())
    }
  },[dispatch,status])

  if (status ==='loading') return <div>Loading</div>
  return (
    <>
      <ProductForm handleSave={saveProduct} />
      {products.map(product => <ProductPreview item={product} key={product.id}/>)}

    </>
  )
}
export default Products