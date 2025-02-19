import {fetchProductsAsync} from '@/features/products/productsSlice.js'
import {useSelector, useDispatch} from 'react-redux';
import {useEffect} from "react";
import ProductPreview from "@/components/ProductPreview.jsx";
function Products(){
  const dispatch = useDispatch();
  const { products, error, status } = useSelector((state) => state.products)
  useEffect(() => {
    if(status === 'ide') {
      dispatch(fetchProductsAsync())
    }
  },[dispatch,status])
  if (status ==='loading') return <div>Loading</div>
  return (
    <>
      {products.map(product => <ProductPreview item={product} key={product.id}/>)}
    </>
  )
}
export default Products