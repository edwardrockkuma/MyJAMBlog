import React, { useState } from "react"
import Layout from "../components/layout"
import PostPreview from "../components/post-preview"

const IndexPage = (props) => {
  /*
    使用useState這個hook，將chunk訂為state，並且setChunk為更改chunk的函式。
    postBoby根據chunk*5的數量來顯示文章，每按一次按鈕，多5篇文章。
  */
  const [chunk, setChunk] = useState(1)
  const head = props.data.allContentfulHead.edges[0].node
  const posts = props.data.allContentfulBlogPost.edges
  const postBoby = posts.slice(0, 5*chunk).map((post)=><PostPreview key={post.node.slug} data={post.node}/>)

  return (
  <Layout>
    <header className="masthead" style={{backgroundImage: `url('${head.image.file.url}')`}}>
      <div className="overlay"></div>
      <div className="container">
        <div className="row">
          <div className="col-lg-8 col-md-10 mx-auto">
            <div className="site-heading">
              <h1>{head.title}</h1>
              <span className="subheading">{head.subTitle}</span>
            </div>
          </div>
        </div>
      </div>
    </header>
    <div className="container">
      <div className="row">
        <div className="col-lg-8 col-md-10 mx-auto">
          {postBoby}
          {/* 根據顯示的文章數是否小於總文章數，來決定按鈕是否顯示 */}
          <div className="clearfix" style={{display: 5*chunk<posts.length ? 'block' : 'none' }}>
            {/* 按下按鈕，觸發setChunk，將chunk變為chunk+1，並且因為state改變，因此組件觸發重新渲染 */}
            <p className="btn btn-primary float-right" onClick={() => setChunk(chunk + 1)}>Older Posts &rarr;</p>
          </div>
        </div>
      </div>
    </div>

    <hr/>
  </Layout>
)}

export default IndexPage

export const indexQuery = graphql`
query indexQuery {
  allContentfulHead {
    edges {
      node {
        image {
          file {
            url
          }
        }
        title
        subTitle
      }
    }
  }
  allContentfulBlogPost(sort: { fields: [publishDate], order: DESC }) {
    edges {
      node {
        slug
        title
        
        publishDate(formatString: "MMMM Do, YYYY")        
        body {
          childMarkdownRemark {
            excerpt
          }
        }
      }
    }
  }
}
`
