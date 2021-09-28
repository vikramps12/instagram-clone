//import { Set } from 'mongoose'
import React, { useState, useEffect, useContext } from 'react'
import { Usercontext } from '../../App'
//import {Link} from 'react-router-dom'

const Home = () => {
    const [data, setData] = useState([])
    const { state, dispatch } = useContext(Usercontext)
    useEffect(() => {
        fetch('/allpost', {
            headers: {
                "Authorization":"bearer " + localStorage.getItem("jwt")
            }
        }).then(res => res.json())
            .then(result => {
                console.log(result)
                setData(result.posts)
            })
    }, [])
    const likePost = (id) => {
        fetch('/like', {
            method:"put",
            headers:{
                'Content-Type': 'application/json',
                "Authorization":"bearer " + localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                postId:id 
            })
        }).then(res => res.json())
            .then(result => {
                const newData = data.map(item => {
                    if (item._id == result._id) {
                        return result
                    } else {
                        return item
                    }
                })
                setData(newData)
            }).catch(err =>{
                console.log(err)
            })
    }

const unlikePost = (id) => {
        fetch('/unlike', {
            method: "put",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "bearer " + localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                postId:id
            })
        }).then(res => res.json())
            .then(result => {
                const newData = data.map(item => {
                    if (item._id == result._id) {
                        return result
                    } else {
                        return item
                    }
                })
                setData(newData)
            }).catch(err => {
                console.log(err);
            })
    }
    return (
        <div className="Home">
            {
                data.map(item => {
                    return (
                        <div className="card homecard" key={item._id}>
                            <h5>{item.postedby.name}</h5>
                            <div className="card-image">
                                <img src={item.photo}></img>
                            </div>
                            <div className="card-content">
                                <i className="material-icons" style={{ color: "red" }}>favorite</i>
                                {item.likes.includes(state._id)
                                    ? <i className="material-icons" onClick={() => {unlikePost(item._id)}}>thumb_down</i>
                                    :
                                    <i className="material-icons" onClick={() => {likePost(item._id) }}>thumb_up</i>
                                }
                                <h6>{item.likes.length} likes</h6>
                                <h6>{item.title}</h6>
                                <p>{item.body}</p>
                                <input type="text" placeholder="add comment"></input>
                            </div>
                        </div>
                    )
                })
            }

        </div>
    )
}

export default Home