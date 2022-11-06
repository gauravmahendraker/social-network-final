import Suggestion from "./suggestion.jsx";
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../axios";

const Suggestions = ({userId}) => {
  const { isLoading, error, data } = useQuery(["suggestions"], () =>
    makeRequest.get("/suggest?userId="+userId).then((res) => {
      return res.data;
    })
  );

  return (
    <div className="friends">
      {error
        ? "Something went wrong!"
        : isLoading
        ? "loading"
        : data.map((suggestion) => <Suggestion suggestion={suggestion} key={suggestion.followedUserId} />)}
    </div>
  );
};

export default Suggestions;