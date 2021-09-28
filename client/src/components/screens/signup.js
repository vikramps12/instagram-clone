import React, { useState } from 'react'
import {Link,useHistory} from 'react-router-dom'
import M from 'materialize-css'
const Signup = () => {
    const history = useHistory()
    const [name,setName] = useState("")
    const [password,setPassword] = useState("")
    const [email,setEmail] = useState("")
    const postdata = ()=>{
        if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email))
        {
            return  M.toast({html:"Invalid email",classes:"red darken-3"})
        }
        fetch("/Signup",{
            method:"post",
            headers:{
                "content-type":"application/json"
            },
            body:JSON.stringify({
                name,
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
                M.toast({html:data.message,classes:"green lighten-2"})
                history.push('/Login')
            }
        })

    }
    return (
        <div className= "mycard">
            <div className="card authcard input-field">
                <h2>Instagram</h2>
                <input type ="text" placeholder="Name" value={name} onChange={(e)=>setName(e.target.value)}></input>
                <input type ="text" placeholder="Email"value={email} onChange={(e)=>setEmail(e.target.value)}></input>
                <input type ="password" placeholder="Password"value={password} onChange={(e)=>setPassword(e.target.value)}></input>
                <button onClick={()=>postdata()}className="btn waves-effect blue darken-1" >Signup
                </button>
                <h5>
                    <Link to ="/Login">Already have an account?</Link>
                </h5>
            </div>
        </div>
    )
}

export default Signup