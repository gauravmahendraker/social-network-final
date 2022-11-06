import "./navbar.scss";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { DarkModeContext } from "../../context/darkModeContext";
import { AuthContext } from "../../context/authContext";
import axios from "axios";
import { useState } from "react";
import Search1 from "../search/Search.jsx";
// import SearchBar from "../Searchbar/Searchbar.jsx";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../../axios";

const Navbar = () => {
  const { toggle, darkMode } = useContext(DarkModeContext);
  const { currentUser } = useContext(AuthContext);
  const [openSearch, setOpenSearch] = useState(false);
  const [Search, setSearch] = useState(false);
  const handleClick = async (e) => {
    try {
      await axios.post("http://localhost:8802/api/auth/logout", null);
    }
    catch (err) {
      console.log('eroor')
    }
  }
  const [input, setInputs] = useState("");
  const [err, setErr] = useState(null);

  const handleChange = (e) => {
    setInputs((prev) => prev = e.target.value);


  };



  // const { isLoading, error, data } = useQuery(["search"], () =>
  //   makeRequest.get("/search?input=" + input).then((res) => {
  //     return res.data;

  //   })
  // );



  return (
    <div className="container">
      <div className="navbar">
      <div className="left">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span>SocialiZe</span>
        </Link>
        <a href="/"><HomeOutlinedIcon /></a>

        {darkMode ? (
          <WbSunnyOutlinedIcon onClick={toggle} />
        ) : (
          <DarkModeOutlinedIcon onClick={toggle} />
        )}
        <GridViewOutlinedIcon />
        <div className="search">
          <SearchOutlinedIcon onClick={() => setOpenSearch(true)} />
          <input type="text" placeholder="Search..." name="username"
            onChange={handleChange} />

            
        </div>

        {/* <Search1 input='test' /> */}
        {/* <SearchBar placeholder="Enter a Book Name..." data={data} /> */}
        {/* console.log(openSearch); */}

      </div>
      <div className="right">
        <PersonOutlinedIcon />
        <EmailOutlinedIcon />
        <NotificationsOutlinedIcon />
        <div className="user">
          <img
            src={"/upload/" + currentUser.profilePic}
            alt=""
          />
          <span>{currentUser.name}</span>
          <Link to="/login">
            <button onClick={handleClick}>Logout</button>
          </Link>
        </div>
      </div>

    </div>
    <div className="resultContainer">{openSearch && <div className="result"><Search1 setOpenSearch={setOpenSearch} input={input} /> </div>}</div>
    </div>
    
  );
};

export default Navbar;
