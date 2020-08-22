import express from "express";

const app = express();

app.use(express.static("output")); // TODO: Add some tests for this stuff
app.use(express.static("static")); // TODO: Add some tests for this stuff
app.use((req, res, next) => res.status(404).send("Not Found"));

export default app;
