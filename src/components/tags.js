import React from 'react'
import Helmet from 'react-helmet'
import { Link, graphql } from 'gatsby'
import Layout from '../components/Layout'
import PostPreview from "../components/post-preview"

//class TagRoute extends React.Component {
  //render() {
const TagRoute = (props) => {
   
    const posts = props.data.allContentfulBlogPost.edges
    //const postBoby = posts.slice(0, 5*chunk).map((post)=><PostPreview key={post.node.slug} data={post.node}/>)
    const postLinks = posts.map(post => (
      <li key={post.node.slug}>
        <Link to={`/blog/${post.node.slug}`}>
          <h2 className="is-size-2">{post.node.title}</h2>
        </Link>
      </li>
    ))
    const tag = props.pageContext.tag
    const title = props.data.site.siteMetadata.title
    const totalCount = props.data.allContentfulBlogPost.totalCount
    const tagHeader = `${totalCount} post${
      totalCount === 1 ? '' : 's'
    } tagged with “${tag}”`

    return (
      <Layout>
        <section className="section">
          <Helmet title={`${tag} | ${title}`} />
          <div className="container content">
            <div className="columns">
              <div
                className="column is-10 is-offset-1"
                style={{ marginBottom: '6rem' }}
              >
                <h3 className="title is-size-4 is-bold-light">{tagHeader}</h3>
                <ul className="taglist">{postLinks}</ul>
                <p>
                  <Link to="/tags/">Browse all tags</Link>
                </p>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    )
  //}
}

export default TagRoute

export const tagPageQuery = graphql`
  query TagPage($tag: String) {
    allContentfulBlogPost(
      limit:1000
      sort: { fields: [publishDate], order: DESC }
      filter: { tags: { in: [$tag] } } 
      ) {
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
    site {
      siteMetadata {
        title
        
        
      }
    }
  }
`
