import React from "react"
import { Link } from "gatsby"
const PostPreview = (props) => {
  const post = props.data
  return (
  <>
    <div className="post-preview">
      <Link to={`/blog/${post.slug}`}>
        <h2 className="post-title">
        {post.title}
        </h2>
        <h3 className="post-subtitle">
        {post.subTitle}
        </h3>
      </Link>
      <p className="post-meta">Posted on {post.publishDate}</p>
    </div>
    <hr/>
  </>
)}
export default PostPreview

