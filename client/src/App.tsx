import React, { useEffect, useContext } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import axios from "axios";
import { Navbar } from "./components/Navbar";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { UserContext } from "./context/userContext";
import "./App.css";

function App() {
  const { setUser } = useContext(UserContext);
  const getUser = async () => {
    let token = localStorage.getItem("token");
    if (token === null) {
      token = "";
      localStorage.setItem("token", "");
    }
    const tokenRes = await axios.post("/auth", null, {
      headers: {
        "x-auth-token": token,
      },
    });
    console.log(tokenRes.data);
    if (tokenRes.data) {
      const userData = await axios.get("/auth", {
        headers: {
          "x-auth-token": token,
        },
      });
      setUser({ token, user: userData.data, isAuth: true });
    }
  };
  useEffect(() => {
    getUser();
    // eslint-disable-next-line
  }, []);
  return (
    <Router>
      <Navbar />
      <div className="container">
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/login" exact component={Login} />
          <Route path="/signup" exact component={Register} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
