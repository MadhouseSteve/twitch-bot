import express from "express";

export default (req: express.Request, res: express.Response) => {
  res.clearCookie("LOGIN_TOKEN");
  res.clearCookie("LOGGED_IN");
  res.redirect("/");
};
