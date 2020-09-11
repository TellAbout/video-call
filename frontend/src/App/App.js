import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import VideoChat from '../components/VideoChat'
import LogIn from '../components/logIn'
import Users from "../components/users";


export default function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/">
            <LogIn />
          </Route>
        </Switch>
        <Switch>
          <Route path="/users">
            <Users />
          </Route>
        </Switch>
        <Switch>
          <Route path="/call/:roomName/:token">
            <VideoChat />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

