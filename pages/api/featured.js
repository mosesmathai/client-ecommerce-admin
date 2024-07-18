import { Featured } from "@/models/Featured";
import { mongooseConnect } from "@/lib/mongoose";

export default async function handle(req, res) {
  const {method} = req;
  await mongooseConnect();

  if (method === 'PUT') {
    const {name, value} = req.body;
    const featuredDoc = await Featured.findOne({name});
    if (featuredDoc) {
      featuredDoc.value = value;
      await featuredDoc.save();
      res.json(featuredDoc);
    } else {
      res.json(await Featured.create({name,value}));
    }
  }

  if (method === 'GET') {
    const {name} = req.query;
    res.json(await Featured.findOne({name}));
  }
}