import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from "./actions/auth";

import Register from "./components/Pages/Register/Register";
import Login from "./components/Pages/Login/Login";
import PrivateRoute from "./components/Common/PrivateRoute";
import Dashboard from "./components/Pages/Dashboard/Dashboard";
import Artists from "./components/Pages/Artists/Artists";
import Artist from "./components/Pages/Artist/Artist";
import Songs from "./components/Pages/Songs/Songs";
import Song from "./components/Pages/Song/Song";
import Playlists from "./components/Pages/Playlists/Playlists";

import "./styles/App.scss";

class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }

  render() {
    return (
      <Provider store={store}>
        <Router>
          <Fragment>
            <Switch>
              <PrivateRoute exact path="/" component={Dashboard} />
              <PrivateRoute exact path="/artists" component={Artists} />
              <PrivateRoute exact path="/artist/:id" component={Artist} />
              <PrivateRoute exact path="/songs" component={Songs} />
              <PrivateRoute exact path="/song/:id" component={Song} />
              <PrivateRoute exact path="/routines" component={Playlists} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
            </Switch>
          </Fragment>
        </Router>
      </Provider>
    );
  }
}

export default App;
