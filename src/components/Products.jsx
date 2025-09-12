import { fetchProductsAsync } from '@/features/products/productsSlice.js'
import {useSelector, useDispatch} from 'react-redux';
import {useEffect, useState} from "react";
import ProductPreview from "@/components/ProductPreview.jsx";
import Pagination from "@/components/Pagination.jsx";


function Products(){
  const dispatch = useDispatch();
  const { products, status, total_pages } = useSelector((state) => state.products)
  const [query, setQuery] = useState('')
  const [search, setSearch] = useState('')
  const [page,setPage] = useState(1)

  // const {jobapplications, status, total_pages} = useSelector((state) => state.jobs)
  // fetch when page or query changes
  useEffect(() => {
    dispatch(fetchProductsAsync({ page, query }))
  }, [dispatch, page, query]);

  // debounce search -> query
  useEffect(() => {
    const t = setTimeout(() => {
      setPage(1)
      setQuery(search.trim())
    }, 350)
    return () => clearTimeout(t)
  }, [search])


  const isLoading = status === 'loading'

  return (
    <div className="container">
      <div className="products-toolbar">
        <input
          type="search"
          className="products-search"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {/* Future: add sort/filter controls here */}
      </div>

      {isLoading ? (
        <div className="products-grid">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="product-card-skeleton" />
          ))}
        </div>
      ) : (
        <>
          {products?.length ? (
            <div className="products-grid">
              {products.map((product) => (
                <ProductPreview item={product} key={product.id} />
              ))}
            </div>
          ) : (
            <div className="empty-state">No products found.</div>
          )}

          <div className={"flex-right"}>
            <Pagination totalPages={total_pages} page={page} onPageChange={setPage} />
          </div>
        </>
      )}
    </div>
  )
}

export default Products