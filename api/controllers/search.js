import { db } from "../connect.js";
import jwt from "jsonwebtoken";
import moment from "moment";

export const getSearch = (req, res) => {
  const q = `SELECT * from users where username like \"\%${req.query.input}\%\"`;
  const value=[req.query.input];
  console.log(req.query.input);
    

  db.query(q , (err, data) => { //reolace postid with input
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};