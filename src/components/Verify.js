import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import logo from "../assets/left.png";
import "./styles.css";
import { Backend_url } from "../index.js";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Verify = () => {
  const { phoneNumber } = useContext(AuthContext);
  const [error, setError] = useState();
  const [otpVal, setOtpVal] = useState(Array(4).fill(""));
  const [remainingTime, setRemainingTime] = useState(300);
  const navigate = useNavigate();

  useEffect(() => {
    const intervalId = setInterval(() => {
      setRemainingTime((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const minutes = Math.floor(remainingTime / 60);
  const seconds = remainingTime % 60;

  const handleChange = (e, index) => {
    const { value } = e.target;
    setOtpVal((prev) => {
      const newOtpVal = [...prev];
      newOtpVal[index] = value;
      return newOtpVal;
    });
  };

  const handleKeyUp = (e, index) => {
    const { value } = e.target;
    if (value.length === 1 && index !== 3) {
      e.target.nextSibling.focus();
    }
  };

  const handleSend = async (e) => {
    try {
      const url = `${Backend_url}/resend`;
      const res = await axios.post(url, { phoneNumber });
      alert(res.data.message);
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const enteredOtp = parseInt(otpVal.join(""));
    const data = {
      phoneNumber: phoneNumber,
      otp: enteredOtp,
    };

    try {
      const url = `${Backend_url}/verify`;
      const { data: res } = await axios.post(url, data);
      alert(res.message);
      if (res.message === "Mobile OTP is verified successfully") {
        navigate("/success");
      }
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
      }
    }
  };

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
          <h4>OTP Verify</h4>
          <p>Enter OTP Sent on{`+91 ${phoneNumber}`}</p>
          <div className="otp-base">
            {otpVal.map((val, index) => (
              <input
                type="text"
                key={index}
                value={val}
                onChange={(e) => handleChange(e, index)}
                onKeyUp={(e) => handleKeyUp(e, index)}
              />
            ))}
          </div>

          <div className="timeStamp">
            <p>
              {minutes.toString().padStart(2, "0")}:
              {seconds.toString().padStart(2, "0")}
            </p>
            <Link className="resendOtp-btn" onClick={handleSend}>Resend OTP</Link>
          </div>
          {error && <div>{error}</div>}
          <button onClick={handleSubmit} type="submit">
            Verify
          </button>
        </div>
      </div>
    </div>
  );
};

export default Verify;
