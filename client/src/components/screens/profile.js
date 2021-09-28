import React, { useEffect,useState,useContext} from 'react'
import {Usercontext} from '../../App'
const Profile = () => {
    const [mypics,setPics] = useState([])
    const {state,dispatch} = useContext(Usercontext)
    useEffect(()=>{
    fetch('/mypost',{
        headers:{
            "Authorization":"bearer "+localStorage.getItem("jwt")
        }
    }).then(res=>res.json())
    .then(result=>{
        console.log(result)
        setPics(result.mypost)
    })
 },[])
    return (
        <div  style={{ maxWidth:"550px",margin:"0px auto"}}>
            <div style={{
                display: "flex",
                justifyContent: "space-around",
                borderBottom: "1px solid grey"
            }}>
                <div>
                    <img style={{ width: "160px", height: "160px", borderRadius: "80px", margin: "18px 0px 0px 0px" }}
                        src="https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60" />
                </div>
                <div>
                    <h4>{state?state.name:"loading"}</h4>
                    <div style={{ display: "flex", justifyContent: "space-around", width: "109%" }}>
                        <h6>40 posts</h6>
                        <h6>40 followers</h6>
                        <h6>40 following</h6>
                    </div>
                </div>
            </div>

            <div className="gallery">
                {
                    mypics.map(item=>{
                        return(
                            <img key={item._id} className="item" src={item.photo} alt ={item.title} />                        )
                    })
                }
            </div>
        </div>
    )
}

export default Profile