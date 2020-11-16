import React, { Component } from 'react';
import axios from 'axios';
import {Form,Table,Button} from 'react-bootstrap';
    
class SearchReddit extends Component{
    constructor(props){
        super(props)

        this.state = {
            subreddit: "",
            posts: []
        }

     }
    
    getPosts = (ev) =>{
      ev.preventDefault()
      axios.get('http://www.reddit.com/subreddits/search.json?q='+this.state.subreddit+'&sort=new,hot&limit=100') 
      .then(res=>   {
          console.log(res);
        let arrPosts= [];
        res.data.data.children.forEach((post)=>{
            arrPosts.push(post);
        });
        this.setState({

            posts: arrPosts
  
          });
        }
        )
      }
        
    

    handleChangeSearch(search) {
        this.setState({subreddit: search});
        console.log("subreddit searched : "+ JSON.stringify(this.state.subreddit))
      }


    render(){

     return(
        <React.Fragment>
            <h2>Searching for subreddits</h2>
            <form onSubmit={this.getPosts}>
                <Form.Group controlId="searchInput">
                <Form.Label>Enter a subreddit</Form.Label>
                <Form.Control type="text" placeholder="Typin any subreddit"
                onChange={e => this.handleChangeSearch(e.target.value)}  value={this.state.searched}/>
                <Button className="btn btn-primary btn-large centerButton" type="submit">OK</Button>
                </Form.Group>
            </form>
            <Table striped bordered hover>
                <thead>
                    <tr>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Subreddit URL</th>
                    <th>Bookmark the subreddit</th>
                    </tr>
                </thead>
                <tbody>
                {
                   
                  this.state.posts.map(function(post) {
                    //if(!isEmpty(this.state.posts))
                     return <tr key={post}>
                       <td>{post.data.title}</td>
                       <td>{post.data.public_description}</td>
                        <td>{post.data.url}</td>
                        <td>
                        <Button className="btn btn-primary btn-large centerButton" type="submit">Add + </Button>
                        </td>
                     </tr>
                     /* return <tr>
                         <td>EMPTY</td>
                         <td>EMPTY</td>
                         </tr>; */
                  })
              }
                </tbody>
            </Table>
            
          
        </React.Fragment>)
       }
      }

export default SearchReddit;