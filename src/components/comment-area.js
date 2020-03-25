import React, { useEffect, useState } from "react"
import Comment from "./comment"
import {client, clientManage} from "../cms-config"

const CommentArea = (props) => {
  const postId = props.postId
  const [input, setInput] = useState(
    {
      userId: "",
      text: ""
    }
  )
  const [comments, setComments] = useState([])

  const getComments = () => {
    client.getEntries({
      'sys.id': postId,
    })
    .then((response) => {
      if(response.items[0].fields.hasOwnProperty("comments")) {
        const result = response.items[0].fields.comments.filter(comment => comment.hasOwnProperty("fields"));
        setComments(result)
      }
    })
    .catch(console.error)
  }

  const inputHandler = (e, type) => {
    switch(type){
      case "userId":
        setInput({...input, userId: e.target.value});
        break;
      case "text":
        setInput({...input, text: e.target.value});
        break;
    }
  }

  const clickHandler = () => {
    let newEntry
    const clientSpace = clientManage.getSpace(process.env.CONTENTFUL_SPACE_ID)
    clientSpace
    .then((space) => space.createEntry('comment', {
      fields: {
        userId: {"en-US": input.userId},
        content: {"en-US": input.text}
      }
    }))
    .then((entry) => {
      setInput({userId: "", text: ""})
      entry.publish()
      newEntry = entry
    })
    .then(() => {
      clientSpace
      .then((space)=>space.getEntry(postId))
      .then((entry) => {
        let add = {
        sys:{
          type: "Link",
          linkType: "Entry",
          id: newEntry.sys.id
          }
        }
        if(!entry.fields.hasOwnProperty("comments")){
          entry.fields.comments = {"en-US":[]}
        }
        entry.fields.comments["en-US"].push(add)
        return entry.update()
      })
      .then((entry) => {
        entry.publish()
      })
      .then(()=>{
        setTimeout(getComments,3000)
        
      })
      .catch(console.error)
    })
  }

  useEffect(()=>{
    getComments();
  },[])


  return (
  <>
    <div style={{background: "#f7f7f7", padding: "30px 0"}}>
      <div className="container">
        <div className="row">
          <form className="col-lg-8 col-md-10 mx-auto">
            <div className="form-group">
              <label htmlFor="FormControlInput">使用者名稱</label>
              <input className="form-control" id="FormControlInput" value={input.userId} onChange={(e)=>inputHandler(e, "userId")}/>
            </div>
            <div className="form-group">
              <label htmlFor="FormControlTextarea">留言</label>
              <textarea className="form-control" id="FormControlTextarea" rows="6" value={input.text} onChange={(e)=>inputHandler(e, "text")}></textarea>
            </div>
            <button type="button" className="btn btn-secondary btn-sm" onClick={clickHandler}>Submit</button>
          </form>
        </div>
      </div>

      <div className="container" style={{padding: "70px auto 70px", padding: "30px 20px 0"}}>
        {comments.map((comment)=><Comment key={comment.sys.id} data={comment}/>)}
      </div> 
    </div>
  </>
)}
export default CommentArea

