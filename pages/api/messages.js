import { mongooseConnect } from "@/lib/mongoose";
import { Message } from "@/models/Message";

export default async function handler(req,res) {
  await mongooseConnect();
  res.json(await Message.find().sort({createdAt:-1}));
}