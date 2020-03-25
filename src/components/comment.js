import React from "react"

const Comment = (props) => {
  const data = props.data
  return (
    <div className="row">
        <div className="col-lg-9 col-md-10 mx-auto" style={{background: "#F1F1F1", padding: "10px 15px", marginBottom: "20px"}}>
            <h5>{data.fields.userId} :</h5>
            <p>{data.fields.content}</p>
            {data.fields.hasOwnProperty("reply")=="" ? "" : <p style={{fontSize: "18px", color: "#888888", background: "#E3E3E3", padding: "20px", margin: "0", maxWidth: "550px"}}>版主: {data.fields.reply}</p>}
            <span style={{float: "right", fontSize: "18px", color: "#888888"}}>edited on {data.sys.createdAt.split('T').shift().split('-').join('/')}</span>
        </div>
    </div>
)}
export default Comment

