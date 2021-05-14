// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { client } from "../../libs/contenfulClient";

export default (req, res) => {
  console.log(req.query);
  // const { items } = await client.getEntries({
  //   content_type: "cuisine",
  //   limit: 2,
  //   skip: pageNumber * pageSize,
  // });
  res.status(200).json({ name: "John Doe" });
};
