import Friend from "../friend/Friend";
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../axios";

const Friends = ({userId}) => {
  const { isLoading, error, data } = useQuery(["frnds"], () =>
    makeRequest.get("/friends?userId="+userId).then((res) => {
      return res.data;
    })
  );

  return (
    <div className="friends">
      {error
        ? "Something went wrong!"
        : isLoading
        ? "loading"
        : data.map((friend) => <Friend friend={friend} key={friend.followedUserId} />)}
    </div>
  );
};

export default Friends;