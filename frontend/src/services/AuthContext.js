import { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

const AuthContext = createContext();
const token = 'lewis254'

export default AuthContext;

export const AuthProvider = ({ children }) => {
  let [authTokens, setAuthTokens] = useState(token);
  let [user, setUser] = useState(() => {
    try {
      return jwtDecode(token);
    } catch {
      return null;
    }
  });

  const navigate = useNavigate();

  let loginUser = async (e) => {
    e.preventDefault();
    let response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: e.target.email.value,
        password: e.target.password.value,
      }),
    });
    let data = await response.json();
    console.log("dta: ", data);
    console.log("res: ", response);

    console.log(response.status);

    if (response.status === 200) {
      setAuthTokens(data.accessToken);
      setUser(jwtDecode(data.accessToken));
      console.log(authTokens);
      console.log(data);
      api.defaults.headers["Authorization"] = "Bearer " + data.accessToken;
      navigate("/home");
    } else {
      console.log(user);
      alert("Niepoprawny email lub hasło!");
    }
  };

  let logoutUser = () => {
    const response = api.post("/auth/logout", {
      Authorization: "Bearer " + authTokens.trim(),
    });
    setAuthTokens(null);
    setUser(null);
    api.defaults.headers["Authorization"] = null;
    navigate("/login");
  };

  let contextData = {
    user: user,
    loginUser: loginUser,
    logoutUser: logoutUser,
  };

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};
