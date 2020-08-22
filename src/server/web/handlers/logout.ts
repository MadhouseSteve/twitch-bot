import express from "express";

import redis from "redis";
const client = redis.createClient();

import { promisify } from "util";
const delAsync = promisify(client.del).bind(client);

export default async (req: express.Request, res: express.Response) => {
  const matches = req.headers.cookie?.match("LOGIN_TOKEN=(.*);");
  if (matches) {
    const session_token = matches[1];
    // @ts-ignore
    await delAsync(session_token);
  }

  res.clearCookie("LOGIN_TOKEN");
  res.clearCookie("LOGGED_IN");
  res.redirect("/");
};
