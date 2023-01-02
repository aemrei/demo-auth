import nc from "next-connect";
import cors from "cors";
import type { NextApiRequest, NextApiResponse } from "next";

interface LoginRequest {
  email: string;
  password: string;
}

interface LoginResponse {
  token: string;
}

const corsHandler = cors({
  origin: "*",
  methods: ["POST", "GET", "HEAD"],
});

const handler = nc<NextApiRequest, NextApiResponse<LoginResponse>>()
  .use(corsHandler)
  .post(async (req, res) => {
    const { email, password } = req.body as LoginRequest;
    // for testing purposes, if the email is example.com domain and the password
    // is the same with username part of the email, then return a token
    if (
      email &&
      password &&
      email.endsWith("@example.com") &&
      email.split("@")[0] === password
    ) {
      const dummyToken = btoa(JSON.stringify({ email, password }));
      res.status(200).json({ token: dummyToken });
    } else {
      res.status(401).end();
    }
  })
  .options((req, res) => {
    res.status(200).end();
  });

export default handler;
