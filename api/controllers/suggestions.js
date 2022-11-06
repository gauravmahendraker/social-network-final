import { db } from "../connect.js";
import jwt from "jsonwebtoken";

export const suggest = (req, res) =>{
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not logged in!");

    jwt.verify(token, "secretkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");
    
        
    
        const q =
        //    `SELECT distinct u.id AS userId, name, profilePic FROM users AS u 
        // RIGHT JOIN relationships AS r ON (u.id != r.followedUserId AND u.id != r.followerUserId) WHERE r.followerUserId= ? ORDER by RAND() LIMIT 3`;

          `SELECT u.id as userId, name, profilePic FROM users as u WHERE u.id NOT IN (SELECT u1.id AS userId FROM users AS u1
          JOIN relationships AS r ON (u1.id = r.followedUserId) WHERE r.followerUserId= ?) AND u.id != ?  ORDER by RAND() LIMIT 3`;
        db.query(q, [userInfo.id, userInfo.id], (err, data) => {
          if (err) return res.status(500).json(err);
          return res.status(200).json(data);
        });
      });
}