import "./app.scss";
import Home from "./pages/home/Home";
import Register from "./pages/register/Register";
import Watch from "./pages/watch/Watch";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import MyList from "./pages/MyList/MyList";
import Navbar from "./components/navbar/Navbar";
import DetailModal from "./components/detailsModal/Details";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./authContext/AuthContext";
import { SearchBar } from "./components/searchBar/searchBar";

const App = () => {
  const { user } = useContext(AuthContext);
  return (
    <Router>
      {user && (
        <>
          <DetailModal />
        </>
      )}
      <Switch>
        <Route exact path="/">
          {user ? <Home /> : <Redirect to="/register" />}
        </Route>
        <Route path="/register">
          {!user ? <Register /> : <Redirect to="/" />}
        </Route>
        <Route path="/login">{!user ? <Login /> : <Redirect to="/" />}</Route>
        {user && (
          <>
            <Route path="/movies">
              <Home type="movie" />
            </Route>
            <Route path="/series">
              <Home type="series" />
            </Route>
            <Route path="/watch">
              <Watch />
            </Route>
            <Route path="/profile">
              <Profile />
            </Route>
            <Route path="/mylist">
              <MyList />
            </Route>
            <Route path="/search">
              <SearchBar />
            </Route>
            <Route path="/details">
              <DetailModal />
            </Route>
          </>
        )}
      </Switch>
    </Router>
  );
};

export default App;
