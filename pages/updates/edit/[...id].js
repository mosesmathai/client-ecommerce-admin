import Layout from "@/components/Layout";
import UpdateForm from "@/components/UpdateForm";
import axios from "axios";
import { useEffect, useState } from "react";
import Spinner from '@/components/Spinner';
import { useRouter } from "next/router";

export default function EditUpdatePage() {
  const [updateInfo, setUpdateInfo] = useState(null)
  const [returnToUpdates, setReturnToUpdates] = useState(false)
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter()
  const {id} = router.query
  useEffect(() => {
    if (!id) {
      return;
    }
    setIsLoading(true);
    axios.get('/api/updates?id='+id).then(response => {
      setUpdateInfo(response.data);
      setIsLoading(false);
    })
  }, [id])

  if (returnToUpdates) {
    router.push('/updates');
  }

  return (
    <Layout>
      <h1>Edit Update</h1>
      {isLoading && (
        <div className='py-2 flex justify-center'>
          <Spinner />
        </div>
      )}
      {updateInfo && (
        <UpdateForm {...updateInfo} />
      )}
      <button onClick={ev => setReturnToUpdates(true)} className="mt-2 bg-gray-400 px-2 py-1 rounded-md">Discard Changes</button>
    </Layout>
  )
}
