import Layout from "@/components/Layout";
import axios from "axios";
import { useRouter } from "next/router";

import { useEffect, useState } from "react";

export default function DeleteUpdatePage() {
  const router = useRouter()
  const [updateInfo,setUpdateInfo] = useState()
  const {id} = router.query
  useEffect(() => {
    if (!id) {
      return
    }
    axios.get('/api/updates?id='+id).then(response => {
      setUpdateInfo(response.data) 
    })
  }, [id])

  function goBack() {
    router.push('/updates')
  }

  async function deleteUpdate() {
    await axios.delete('/api/updates?id='+id)
    goBack()
  }

  return (
    <Layout>
      <h1 className="text-center">Do you want to delete &nbsp;&apos;{updateInfo?.title}&apos;?</h1> 
      <div className="flex gap-2 justify-center">
        <button onClick={deleteUpdate} className="btn-red">Yes</button>
        <button className="btn-default" onClick={goBack}>No</button>
      </div>
    </Layout>
  )
}
