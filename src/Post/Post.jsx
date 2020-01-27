

import React, { Component } from 'react';
const Post = (props) => {
   console.log(props)
    return (
       
         
                <div className="post">
                    <div className="img-thumbnail">
                        <img src="https://placeimg.com/200/150/tech" alt="technology" />
                    </div>
                    <div className="content">
                        <p className="title">{props.data.title}</p>
                        <p className="desc">{props.data.body}</p>
                    </div>
                    <button className="btn-update" onClick={()=>props.update(props.data)}>Update</button>
                    <button className="btn-remove" onClick={()=>props.remove(props.data.id)}>Remove</button>
                </div>
            
    
    )
}

export default Post;