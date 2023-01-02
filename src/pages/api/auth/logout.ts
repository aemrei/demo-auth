import nc from "next-connect";
import cors from "cors";
import type { NextApiRequest, NextApiResponse } from "next";

const corsHandler = cors({
  origin: "*",
  methods: ["POST", "GET", "HEAD"],
});

const handler = nc<NextApiRequest, NextApiResponse>()
  .use(corsHandler)
  .post((req, res) => {
    res.status(200).end();
  })
  .get((req, res) => {
    res.status(200).end();
  })
  .options((req, res) => {
    res.status(200).end();
  });

export default handler;
