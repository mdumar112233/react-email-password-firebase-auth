import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import CreateAccount from './components/CreateAccount/CreateAccount';
import Inventory from './components/Inventory/Inventory';
import { createContext, useState } from 'react';
import PrivateRoute from './PrivateRouter/PrivateRouter';

export const UserContext = createContext();


function App() {
  const [loggedInUser, setLoggedInUser] = useState({})
  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
      <Router>
      <Switch>
        <Route exact path='/'>
          <Home/>
        </Route>
        <Route path='/home'>
          <Home/>
        </Route>
        <Route path='/createAccount'>
          <CreateAccount/>
        </Route>
        <Route exact path='/login'>
          <Login/>
        </Route>
        <PrivateRoute path='/inventory'>
            <Inventory/>
        </PrivateRoute>
      </Switch>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
