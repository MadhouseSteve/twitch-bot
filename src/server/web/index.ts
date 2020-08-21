import express from "express";

import homepage from "./handlers/homepage";

const app = express();

app.get("/", homepage);
app.use((req, res, next) => res.status(404).send("Not Found"));

export default app;
