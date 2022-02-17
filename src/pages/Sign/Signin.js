import "./Sign.css";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../../static/constantes";

const Signin = ({ handleConnect }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const response = await axios.post(`${BACKEND_URL}/user/signin`, {
        email: email,
        password: password,
      });
      if (response.data.token) {
        handleConnect(response.data.token);
        navigate("/");
      }
    } catch (error) {
      if (error.response.status === 400 || error.response.status === 401) {
        setErrorMessage("Email and/or password don't match");
      }
    }
  };

  return (
    <div className="sign-wrapper">
      <h2>Signin</h2>
      <form onSubmit={handleSubmit} className="sign-form">
        <input
          type="email"
          placeholder="Email"
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
        <input type="submit" value="Signin" className="theme-primary" />
        <span>{errorMessage}</span>
      </form>
      <Link to="/join">Not part of the community yet ? Join us !</Link>
    </div>
  );
};

export default Signin;
