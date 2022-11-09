import { db } from "../connect.js";
import jwt from "jsonwebtoken";
import moment from "moment";

export const getChats = (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not logged in!");
    jwt.verify(token, "secretkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");
    
        const q = `Select c.* , u.id AS userId, name, profilePic FROM chats AS c JOIN users AS u ON 
        (u.id = c.sId) WHERE (c.sId = ? and c.rId=?) or (c.sId = ? and c.rId=?) ORDER BY c.createdAt DESC`;
        const values = [
            userInfo.id,
            req.query.userId,
            req.query.userId,
            userInfo.id
        ];
    
        db.query(q, values, (err, data) => {
          if (err) return res.status(500).json(err);
          return res.status(200).json(data);
        });
      });
  
};

export const addChat = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, "secretkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const q1 = "INSERT INTO chats(`msg`, `createdAt`, `rId`, `sId`) VALUES (?)";
      //  const q1 = "INSERT INTO chats(`msg`, `sId`, `rId`) VALUES (?)";
    const values = [
      req.body.msg,
      moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
      userInfo.id,
      req.body.userId
    ];

    db.query(q1, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("Chat has been created.");
    });
  });
};


