import React from "react"
import Layout from "./layout"
import CommentArea from "./comment-area"

const PostPage = (props) => {
  const post = props.data.contentfulBlogPost
  return (
  <Layout>
    <header className="masthead" style={{backgroundImage: `url('${post.image.file.url}')`}}>
      <div className="overlay"></div>
      <div className="container">
        <div className="row">
          <div className="col-lg-8 col-md-10 mx-auto">
            <div className="post-heading">
              <h1>{post.title}</h1>
              <h2 className="subheading">{post.subTitle}</h2>
              <span className="meta">Posted on {post.publishDate}</span>
            </div>
          </div>
        </div>
      </div>
    </header>
    <article style={{minHeight: "500px"}}>
      <div className="container">
        <div className="row">
          <div className="col-lg-8 col-md-10 mx-auto content-area" dangerouslySetInnerHTML={{
                __html: post.body.childMarkdownRemark.html,
              }}>
          </div>
        </div>
      </div>
    </article>

    <CommentArea postId={post.contentful_id} />

  </Layout>
)}
export default PostPage

export const pageQuery = graphql`
  query PostBySlug($slug: String!) {
    contentfulBlogPost(slug: { eq: $slug }) {
      contentful_id
      title
      subTitle
      slug
      publishDate(formatString: "MMMM Do, YYYY")
      image {
        file {
          url
        }
      }     
      tags
      body {
        childMarkdownRemark {  
          html
        }
      }
    }
  }
`
