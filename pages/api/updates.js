import { mongooseConnect } from "@/lib/mongoose"
import { Update } from "@/models/Update";
import { isAdminRequest } from "./auth/[...nextauth]";

export default async function handler(req, res) {
  const {method} = req;
  await mongooseConnect();
  await isAdminRequest(req,res);
 

  if (method === 'GET') {
    if (req.query?.id) {
      res.json(await Update.findOne({_id:req.query.id}));
    } else {
      res.json(await Update.find());
    }
  }
  
  if (method === 'POST') {
    const {title,message} = req.body
    const updateDoc = await Update.create({
      title,message
    })
    res.json(updateDoc)
  }

  if (method === 'PUT') {
    const {title,message,_id} = req.body;
    await Update.updateOne({_id}, {title,message});
    res.json(true);
  }

  if (method === 'DELETE') {
    if (req.query?.id) {
      await Update.deleteOne({_id:req.query?.id})
      res.json(true)
    } 
  }
}