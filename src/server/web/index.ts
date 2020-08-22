import express from "express";

import LoginHandler from "./handlers/login";
import LogoutHandler from "./handlers/logout";

const app = express();

app.use(express.static("output")); // TODO: Add some tests for this stuff
app.use(express.static("static")); // TODO: Add some tests for this stuff

app.get("/login", LoginHandler);
app.get("/logout", LogoutHandler);

app.use((req, res, next) => res.status(404).send("Not Found"));

export default app;
