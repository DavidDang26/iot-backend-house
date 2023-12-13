import jwt from "jsonwebtoken";
import * as express from "express";

function authToken(req: express.Request, res: express.Response, next) {
  const authorizationClient = req.headers["authorization"];
  const token = authorizationClient && authorizationClient.split(" ")[1];

  if (!token)
    return res
      .status(401)
      .send({ message: "Please provide valid authorization token" });

  try {
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    next();
  } catch (e) {
    return res.status(403).send({
      message: "Invalid access token"
    });
  }
}

export default authToken;
