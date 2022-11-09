// import Chat from "../chat/Chat";
// import "./chats.scss";

import { useContext, useState } from "react";
import "./chat.scss";
import { AuthContext } from "../../context/authContext";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import moment from "moment";

const Chats = ({ setOpenChat, userId }) => {

    const [msg, setMsg] = useState("");
    const { currentUser } = useContext(AuthContext);

    const { isLoading, error, data } = useQuery(["chats"], () =>
        makeRequest.get("/chats?userId=" + userId).then((res) => {
            return res.data;
        })
    );
    console.log(data);

    const queryClient = useQueryClient();

    const mutation = useMutation(
        (newChat) => {
            return makeRequest.post("/chats", newChat);
        },
        {
            onSuccess: () => {
                // Invalidate and refetch
                queryClient.invalidateQueries(["chats"]);
            },
        }
    );

    const handleClick = async (e) => {
        e.preventDefault();
        mutation.mutate({ msg, userId });
        setMsg("");
    };


    return (
        <div className="chats">

            <div className="write">
                <img src={"/upload/" + currentUser.profilePic} alt="" />
                <input
                    type="text"
                    placeholder="write a message"
                    value={msg}
                    onChange={(e) => setMsg(e.target.value)}
                />
                <button onClick={handleClick} >Send</button>
            </div>
            {error
                ? "Something went wrong"
                : isLoading
                    ? "loading"
                    : data.map((chat) => (
                        currentUser.id === chat.sId ?
                            (<div className="chat right" id="blue" >
                                <img src={"/upload/" + chat.profilePic} alt="" />
                                <div className="info" id="blue">
                                    <span id="blue">{chat.name}</span>
                                    <p id="blue">{chat.msg}</p>
                                </div>
                                <span className="date" id="blue">
                                    {moment(chat.createdAt).fromNow()}
                                </span>
                            </div>)
                            :
                            (<div className="chat">
                                <img src={"/upload/" + chat.profilePic} alt="" />
                                <div className="info">
                                    <span>{chat.name}</span>
                                    <p>{chat.msg}</p>
                                </div>
                                <span className="date">
                                    {moment(chat.createdAt).fromNow()}
                                </span>
                            </div>
                            )


                    ))}
            <button className="close" onClick={() => setOpenChat(false)}>
                close
            </button>
        </div>
    );
};

export default Chats;