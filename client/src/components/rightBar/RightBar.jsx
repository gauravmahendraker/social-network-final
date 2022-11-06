import "./rightBar.scss";
import { Link } from "react-router-dom";
import Friends from "../friends/Friends.jsx"
import Suggestions from "./suggestions.jsx";
const RightBar = () => {
  return (
    <div className="rightBar">
      <div className="container">
        <div className="item">
          <span>Suggestions For You</span>
          <Suggestions/>
        </div>
        
          
        <div className="item">
          <span>Friends</span>
          <Friends/>
          
        </div>
      </div>
    </div>
  );
};

export default RightBar;
