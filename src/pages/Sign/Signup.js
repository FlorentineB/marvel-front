import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Sign.css";
import { Link } from "react-router-dom";
import { BACKEND_URL } from "../../static/constantes";

const Signup = ({ handleConnect }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      if (password !== confirmPassword) {
        return alert("The passwords don't match.");
      }
      const response = await axios.post(`${BACKEND_URL}/user/signup`, {
        email: email,
        username: username,
        password: password,
      });
      console.log("response", response);
      if (response.data.token) {
        handleConnect(response.data.token);
        navigate("/");
      }
    } catch (error) {
      if (error.response.status === 409) {
        setErrorMessage("Cet email a déjà un compte.");
      }
    }
  };

  return (
    <div className="sign-wrapper">
      <h2>Join</h2>
      <form onSubmit={handleSubmit} className="sign-form">
        <input
          type="text"
          placeholder="Username"
          onChange={(event) => {
            setUsername(event.target.value);
          }}
        />
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
        <input
          type="password"
          placeholder="Confirm password"
          onChange={(event) => {
            setConfirmPassword(event.target.value);
          }}
        />
        <input type="submit" value="Join" />
        <span>{errorMessage}</span>
      </form>
      <Link to="/signin">You're already part of the community ? Sign in !</Link>
    </div>
  );
};

export default Signup;
