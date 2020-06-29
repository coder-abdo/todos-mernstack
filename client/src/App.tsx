import React, { useEffect, useContext } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import axios from "axios";
import { Navbar } from "./components/Navbar";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { UserContext } from "./context/userContext";
import { auth } from "./actions/userActions";
import { PrivateRoute } from "./components/PrivateRoute";
import { Todos } from "./pages/Todos";
import ErrorPage from "./pages/Error";
import "./App.css";
function App() {
  let token = localStorage.getItem("token");
  const { dispatch } = useContext(UserContext);
  const getUser = async () => {
    if (token === null) {
      token = "";
      localStorage.setItem("token", "");
    }
    const tokenRes = await axios.post("/auth", null, {
      headers: {
        "x-auth-token": token,
      },
    });
    if (tokenRes.data) {
      const userData = await axios.get("/auth", {
        headers: {
          "x-auth-token": token,
        },
      });
      dispatch(auth({ token, user: userData.data.user }));
    }
  };
  useEffect(() => {
    getUser();
    // eslint-disable-next-line
  }, []);
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/login" exact component={Login} />
        <Route path="/signup" exact component={Register} />
        <PrivateRoute component={Todos} path="/todos" exact />
        <Route component={ErrorPage} />
      </Switch>
    </Router>
  );
}

export default App;
