import React,{useState,useEffect} from 'react'
import M from 'materialize-css'
import {useHistory} from 'react-router-dom'
const Createpost = ()=>{
    const [title,setTitle] = useState("")
    const [body,setBody] = useState("")
    const [image,setImage] = useState("")
    const [url,setUrl] = useState("")
    const history = useHistory()
    useEffect(()=>{
        if(url){
            fetch("/createpost",{
                method:"post",
                headers:{
                    "content-type":"application/json",
                    "Authorization":"bearer "+localStorage.getItem("jwt")
                },
                body:JSON.stringify({
                    title,
                    body,
                    pic:url
                })
            }).then(res=>res.json())
            .then(data=>{
                if(data.error){
                    M.toast({html: data.error,classes:"red darken-3"})
                }
                else{
                    M.toast({html:"Post created successfully",classes:"green lighten-2"})
                    history.push('/')
                }
            })
            .catch(err =>{
                console.log(err)
            })
        }
    },[url])

    const postDetails =()=>{
        const data = new FormData()
        data.append("file",image)
        data.append("upload_preset","instaclone")
        data.append("cloud_name","vikicloud")
        fetch("https://api.cloudinary.com/v1_1/vikicloud/image/upload",{
            method:"post",
            body:data
        })
        .then(res=>res.json())
        .then(data=>{
            setUrl(data.url)
        })
    }
    return(
        <div className="card input-field" style={{margin:"30px auto",
        maxWidth:"500px",padding:"20px",textAlign:"center"}}>
            <input type="text" placeholder="Title" value ={title} onChange={(e)=>setTitle(e.target.value)}></input>
            <input type="text" placeholder="Body" value ={body} onChange={(e)=>setBody(e.target.value)}></input>
            <div className="file-field input-field">
                <div className="btn blue darken-1">
                    <span>Upload image</span>
                    <input type="file" onChange={(e)=>setImage(e.target.files[0])}></input>
                </div>
                <div className="file-path-wrapper">
                    <input className="file-path validate" type="text"></input>
                </div>
            </div>
            <button className="btn waves-effect blue darken-1" onClick={()=>postDetails()}>Submit post
                </button>
        </div>
    )
    
}

export default Createpost