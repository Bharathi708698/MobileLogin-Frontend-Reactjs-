import React, { useContext, useState } from "react";
import { AuthContext } from "./AuthContext";
import logo from "../assets/left.png";
import "./styles.css";
import { Backend_url } from "../index.js";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const { phoneNumber, setPhoneNumber } = useContext(AuthContext);
  const [error, setError] = useState();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const url = `${Backend_url}/register`;
    const res = await axios.post(url, {phoneNumber})
    alert(res.data.message);
    navigate("/verify");
    
    } catch (error) {
        if (
            error.response &&
            error.response.status >= 400 &&
            error.response.status <= 500
          ) {
            setError(error.response.data.message);
          }
        }                
    }
  
  return (
    <div className="container">
      <div className="left">
        <img src={logo} alt="Logo" />
      </div>
      <div className="right">
        <div>
          <h1>
            Welcome to <span>Vendor</span>
          </h1>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry.
          </p>
          <h3>Phone Number</h3>
          <input
            type="number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="enter your mobile number"
          />
          <br />
          {error && <div>{error}</div>}
          <button onClick={handleSubmit} type="submit">Send OTP</button>
        </div>
      </div>
    </div>
  );
};

export default Register;
