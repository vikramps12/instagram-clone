import React,{useContext} from 'react'
import {Link,useHistory} from 'react-router-dom'
import { Usercontext} from '../App'
const NavBar = ()=>{
    const {state,dispatch} = useContext(Usercontext)
    const history = useHistory()
    const renderList =()=>{
      if(state){
        return [
          <li><Link to="/Profile">Profile</Link></li>,
          <li><Link to="/Createpost">Create post</Link></li>,
          <li><button onClick ={()=>{
            localStorage.clear()
            dispatch({type:"CLEAR"})
            history.push('/Login')
          }} className="btn red darken-1" >Logout
          </button></li>

        ]
      }
      else{
        return [
          <li><Link to="/Login">Login</Link></li>,
          <li><Link to="/Signup">Signup</Link></li>
        ]
      }
    }
        return(
        <nav>
        <div className="nav-wrapper white">
          <Link to={state?"/":"/Login"} className="brand-logo left">Instagram</Link>
          <ul id="nav-mobile" className="right">
            {renderList()}
          </ul>
        </div>
      </nav>
    )
}

export default NavBar