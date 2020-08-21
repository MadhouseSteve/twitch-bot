import express from "express";

export default (_: express.Request, res: express.Response) => {
  res.send("hello world");
};
