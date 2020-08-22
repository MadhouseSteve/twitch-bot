import express from "express";
import randomstring from "randomstring";
import Axios from "axios";

import redis from "redis";
const client = redis.createClient();

import { promisify } from "util";
const setAsync = promisify(client.set).bind(client);

export default async (req: express.Request, res: express.Response) => {
  if (!req.query.code) {
    res.redirect("/");
    return;
  }

  let url = "https://id.twitch.tv/oauth2/token?";
  url += "client_id=" + process.env.TWITCH_CLIENT_ID;
  url += "&client_secret=" + process.env.TWITCH_CLIENT_SECRET;
  url += "&code=" + req.query.code;
  url += "&grant_type=authorization_code";
  url += "&redirect_uri=http://localhost:3000/login";

  try {
    const response = await Axios.post(url);
    const cookie_id = randomstring.generate(32);

    await setAsync(cookie_id, JSON.stringify(response.data));

    res.cookie("LOGIN_TOKEN", cookie_id, {
      sameSite: true,
      httpOnly: true,
    });
    res.cookie("LOGGED_IN", "1", {
      sameSite: true,
    });

    res.redirect("/dashboard");
  } catch (e) {
    console.log(e);
    let url = "https://id.twitch.tv/oauth2/authorize?";
    url += "&client_id=" + process.env.TWITCH_CLIENT_ID;
    url += "&redirect_uri=http://localhost:3000/login";
    url += "&response_type=code";
    url += "&scope=user:read:email";
    res.redirect(url);
    return;
  }
};
