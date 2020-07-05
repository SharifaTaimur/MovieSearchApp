import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Movies from "./components/movies";
import NavBar from "./components/navbar";
import LoginForm from "./components/loginForm";
import Customers from "./components/customers";
import Rentals from "./components/rentals";
import NotFound from "./components/notFound";
import MovieForm from "./components/movieForm";
import Register from "./components/register";
import ProtectedRoute from "./components/common/protectedRoute";
import Logout from "./components/logout";
import { getCurrentUser } from "./services/authService";
import "./App.css";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

class App extends Component {
  state = {};

  componentDidMount() {
    const user = getCurrentUser();
    this.setState({ user });
  }

  render() {
    const { user } = this.state;
    return (
      <React.Fragment>
        {/* <ToastContainer /> */}
        <NavBar user={this.state.user} />
        <main className="container">
          <Switch>
            <Route path="/logout" component={Logout} />
            <Route path="/login" component={LoginForm} />
            <ProtectedRoute path="/movies/:id" component={MovieForm} />
            <Route path="/movies" component={Movies} />
            <Route path="/customers" component={Customers} />
            <Route path="/rentals" component={Rentals} />
            <Route path="/register" component={Register} />
            <Route path="/not-found" component={NotFound} />
            {/* <Route path="/" exact component={Movies} /> */}
            <Redirect from="/" exact to="/movies" />
            <Redirect to="/not-found" />
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}
export default App;
