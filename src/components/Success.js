import React, { useEffect, useState } from "react";
import "./Success.css";
import home from "../assets/home.png";
import success from "../assets/success.png";
import { useNavigate } from "react-router-dom";

const Success = () => {
  const [popup, setPopup] = useState("close");
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/");
  };

  useEffect(() => {
    setPopup("open");
  }, []);
  return (
    <div id="body">
      <div className="home">
        <img src={home} alt="Logo" />
        {popup === "open" ? (
          <div className="containers">
            <img src={success} alt="SuccessLogo" />
            <p>All is good! waiting for accept your request</p>
            <p>from main branch</p>
            <button onClick={handleClick}>login again later</button>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Success;
