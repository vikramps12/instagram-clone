import React, { useEffect, createContext,useReducer, useContext} from 'react';
import NavBar from './components/navbar'
import './App.css'
import { BrowserRouter, Route ,Switch,useHistory} from 'react-router-dom';
// import Route from 'color-convert/route';
import Home from './components/screens/home';
import Signup from './components/screens/signup';
import Profile from './components/screens/profile';
import Login from './components/screens/login';
import Createpost from './components/screens/createpost';
import {reducer,initialstate} from './reducers/userReducer'

export const Usercontext = createContext()

const Routing = () => {
  const history = useHistory()
  const {state,dispatch} = useContext(Usercontext)
  useEffect(() =>{
    const user = JSON.parse(localStorage.getItem("user"))
    if(user){
      dispatch({type:"USER",payload:user})
    }
    else{
      history.push('/Login')
    }
  },[])
  return(
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="/Login">
        <Login />
      </Route>
      <Route path="/Signup">
        <Signup />
      </Route>
      <Route path="/Profile">
        <Profile />
      </Route>
      <Route path="/Createpost">
        <Createpost/>
      </Route>
    </Switch>
  )
}
function App() {
  const [state,dispatch] =useReducer(reducer,initialstate)
  return (
    <Usercontext.Provider value = {{state,dispatch}}>
      <BrowserRouter>
      <NavBar />
      <Routing />
    </BrowserRouter>
    </Usercontext.Provider>
  );
}

export default App;
