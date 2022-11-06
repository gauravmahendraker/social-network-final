import { useContext, useState } from "react";
import "./search.scss";
import { AuthContext } from "../../context/authContext";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import moment from "moment";
import { Link } from "react-router-dom";


const Search1 = ({ setOpenSearch,input }) => {
  
  const { currentUser } = useContext(AuthContext);

  const { isLoading, error, data } = useQuery(["search"], () =>
    makeRequest.get("/search?input="+input).then((res) => {
      return res.data;
    })
  );
  console.log(data);

  

  return (
    <div className="results">
      
      {error
        ? "Something went wrong"
        : isLoading
        ? "loading"
        : data.map((result) => (
            <div className="result">
              <img src={"/upload/" + result.profilePic} alt="" />
              <div className="info">
                
                <Link onClick={() => setOpenSearch(false)}
                to={`/profile/${result.id}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <span>{result.username}</span>
              </Link>
                
              </div>
              
            </div>
          ))}
        <button className="close" onClick={() => setOpenSearch(false)}>
          close
        </button>

    </div>
  );
};

export default Search1;
