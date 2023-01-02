import nc from "next-connect";
import cors from "cors";
import type { NextApiRequest, NextApiResponse } from "next";

const corsHandler = cors({
  origin: "*",
  methods: ["POST", "GET", "HEAD"],
});

const handler = nc<NextApiRequest, NextApiResponse>()
  .use(corsHandler)
  .get((req, res) => {
    try {
      // First get the token from the request header
      const token = req.headers.authorization?.split(" ")[1];

      // Then decode the token
      const decodedToken = token ? JSON.parse(atob(token)) : null;
      decodedToken.id = decodedToken.email.split("@")[0];

      // Then return the decoded token
      res.status(200).json(decodedToken);
    } catch (error) {
      res.status(401).end();
    }
  })
  .options((req, res) => {
    res.status(200).end();
  });

export default handler;
