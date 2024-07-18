import Layout from "@/components/Layout";
import ProductForm from "@/components/ProductForm";
import axios from "axios";
import { useEffect, useState } from "react";
import Spinner from '@/components/Spinner';
import { useRouter } from "next/router";

export default function EditProductPage() {
  const [productInfo, setProductInfo] = useState(null)
  const [returnToProducts, setReturnToProducts] = useState(false)
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter()
  const {id} = router.query
  useEffect(() => {
    if (!id) {
      return;
    }
    setIsLoading(true);
    axios.get('/api/products?id='+id).then(response => {
      setProductInfo(response.data);
      setIsLoading(false);
    })
  }, [id])

  if (returnToProducts) {
    router.push('/products');
  }

  return (
    <Layout>
      <h1>Edit Product</h1>
      {isLoading && (
        <div className='py-2 flex justify-center'>
          <Spinner />
        </div>
      )}
      {productInfo && (
        <ProductForm {...productInfo} />
      )}
      <button onClick={ev => setReturnToProducts(true)} className="mt-2 bg-gray-400 px-2 py-1 rounded-md">Discard Changes</button>
    </Layout>
  )
}
