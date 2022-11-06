import { Link } from "react-router-dom";
import { makeRequest } from "../../axios";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";

const Suggestion= ({ suggestion })=>{
    const { currentUser } = useContext(AuthContext);

    const queryClient = useQueryClient();
    return(
        <div className="user">
            <div className="userInfo">
            <img src={"/upload/"+suggestion.profilePic} alt="" />
                <div className="details">
                <a onClick="window.location.reload()">
                    <Link
                    to={`/profile/${suggestion.userId}`}
                    style={{ textDecoration: "none", color: "inherit" }}
                    >
                    <span className="name">{suggestion.name}</span>
                </Link>
                </a>
                </div>
            </div>
        </div>
        
    );
}

export default Suggestion;