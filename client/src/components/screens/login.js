import React,{useState,useContext}from 'react'
import {Link,useHistory} from 'react-router-dom'
import {Usercontext} from '../../App'
import M from 'materialize-css'

const Login = () => {
    const {state,dispatch}= useContext(Usercontext)
    const history = useHistory()
    const [password,setPassword] = useState("")
    const [email,setEmail] = useState("")
    const postdata = ()=>{
        if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email))
        {
            return  M.toast({html:"Invalid email",classes:"red darken-3"})
        }
        fetch("/signin",{
            method:"post",
            headers:{
                "content-type":"application/json"
            },
            body:JSON.stringify({
                password,
                email
            })
        }).then(res=>res.json())
        .then(data=>{
            console.log(data)
            if(data.error){
                M.toast({html: data.error,classes:"red darken-3"})
            }
            else{
                localStorage.setItem("jwt",data.token)
                localStorage.setItem("user",JSON.stringify(data.user))
                dispatch({type:"USER",payload:data.user})
                M.toast({html:"Signed in successfully",classes:"green lighten-2"})
                history.push('/')
            }
        })
        .catch(err =>{
            console.log(err)
        })
            
    }

    return (
        <div className= "mycard">
            <div className="card authcard input-field">
                <h2>Instagram</h2>
                <input type ="text" placeholder="Email"value={email} onChange={(e)=>setEmail(e.target.value)}></input>
                <input type ="password" placeholder="Password"value={password} onChange={(e)=>setPassword(e.target.value)}></input>
                <button onClick ={()=>postdata()} className="btn waves-effect blue darken-1" >Login
                </button>
                <h5>
                    <Link to ="/Signup">Don't have an account?</Link>
                </h5>
            </div>
        </div>
    )
}

export default Login