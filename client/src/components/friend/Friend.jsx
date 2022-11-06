import { Link } from "react-router-dom";
import { makeRequest } from "../../axios";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";

const Friend= ({ friend })=>{
    const { currentUser } = useContext(AuthContext);

    const queryClient = useQueryClient();
    
    return(
        <div className="user">
            <div className="userInfo">
            <img src={"/upload/"+friend.profilePic} alt="" />
                <div className="details">
                <a onClick="window.location.reload()">
                    <Link
                    to={`/profile/${friend.userId}`}
                    style={{ textDecoration: "none", color: "inherit" }}
                    >
                    <span className="name">{friend.name}</span>
                </Link>
                </a>
                </div>
            </div>
        </div>
        
    );
}

export default Friend;