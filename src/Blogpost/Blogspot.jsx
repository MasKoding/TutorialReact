 import React,{Component,Fragment}  from 'react';
 import  './Blogspot.css';
import Post from '../Post/Post';
import axios from 'axios';

 class Blogspot extends Component{
    
    state = {
       post:[],
       formBlogPost:{
        userId: 1,
        id: 1,
        title: "",
        body: ""
       },
       isUpdate:false

    }
    
    getPostApi = ()=>{
        axios.get("http://localhost:3004/posts?_sort=id&_order=desc")
         .then((result)=>{
           this.setState({
               post:result.data
           })
            
         })
    }
    postApi = ()=>{
        axios.post('http://localhost:3004/posts',this.state.formBlogPost)
       .then((res)=>{
           console.log(res)
           alert("Success Add Data")
           this.getPostApi()
       },(err)=>{
           console.log(err)
       })
    }
    componentDidMount(){
        // fetch('https://jsonplaceholder.typicode.com/posts')
        // .then(response => response.json())
        // .then(json => {
        //    this.setState({
        //        post:json
        //    })
        // })
     this.getPostApi()
        
     }

     clearMethod = ()=>{
         this.setState({
            formBlogPost:{
                userId: 1,
                id: 1,
                title: "",
                body: ""
               },
               isUpdate:false
         })
     }

     handleRemove = (data)=>{
         axios.delete(`http://localhost:3004/posts/${data}`)
         .then((res)=>{
             console.log(res);
             alert("Success Remove Data");
             this.getPostApi()
         },(err)=>{
             console.log(err)
         })
     }

     handleSubmit = ()=>{
        if(this.state.isUpdate){
            this.putApi(this.state.formBlogPost.id)
            this.clearMethod()
        }else{
            this.postApi()
            this.clearMethod()
        }
       
     }
    
     putApi = (data)=>{
       axios.put(`http://localhost:3004/posts/${data}`,this.state.formBlogPost)
       .then((res)=>{
           console.log(res)
           alert("Sukses Update data")
           this.getPostApi()
       },(err)=>{
           console.log(err)
       })
     }
     handleChange = (event)=>{
        let formBlogPostNew = {...this.state.formBlogPost}
        let  timeNow = new Date().getTime()
        formBlogPostNew[event.target.name] = event.target.value
        if(!this.state.isUpdate){
            formBlogPostNew['id'] = timeNow
        }

        this.setState({
            formBlogPost :formBlogPostNew
        })
      
     }

     handleUpdate = (data)=>{
         axios.get(`http://localhost:3004/posts/${data.id}`)
         .then((res)=>{
            let formBlogPostEdit = {...this.state.formBlogPost}
            formBlogPostEdit['title'] = res.data.title
            formBlogPostEdit['body'] = res.data.body
            formBlogPostEdit['id'] = res.data.id
         
            console.log(formBlogPostEdit)
            this.setState({
                formBlogPost:formBlogPostEdit,
                isUpdate:true

            })

         },(err)=>{
           console.log(err)
         })
    
     }
    
     render(){
         return(
             <Fragment>
             <p>Blog </p>
             <hr/>
             <div className="form-add">
                 <label htmlFor="">Title</label>
                 <input type="text" value={this.state.formBlogPost.title} className="title" name="title" placeholder="Add title" onChange={this.handleChange}/>
                 <label htmlFor="">Description</label>
         <textarea name="body" id="desc" cols="30" rows="10" className="desc" placeholder="Add Content" onChange={this.handleChange} value={this.state.formBlogPost.body}></textarea>
                 <button className="btn-submit" onClick={this.handleSubmit}>Save</button>
             </div>
            {
                this.state.post.map(post=>{
                    return <Post key={post.id} data={post} remove={this.handleRemove} update={this.handleUpdate}/>
                })
            }
             </Fragment>
         )
     }
 }

export default Blogspot;
