const Promise = require('bluebird')
const path = require('path')
const _ = require('lodash')

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  return new Promise((resolve, reject) => {
    resolve(
      graphql(
        `
          {
            allContentfulBlogPost {
              edges {
                node {
                  title
                  slug
                  tags
                }
              }
            }
          }
        `
      ).then(result => {
        if (result.errors) {
          console.log(result.errors)
          reject(result.errors)
        }

        const posts = result.data.allContentfulBlogPost.edges
        posts.forEach((post) => {
          createPage({
            path: `/blog/${post.node.slug}/`,
            component: path.resolve('./src/components/post-template.js'),
            // for graphql query para
            context: {
              slug: post.node.slug
            },
          })
        })


        // Tag pages:
        let tags = []
        // Iterate through each post, putting all found tags into `tags`
        posts.forEach(edge => {
          if (_.get(edge, `node.tags`)) {
            tags = tags.concat(edge.node.tags)
          }
        })
        // Eliminate duplicate tags
        tags = _.uniq(tags)

        // Make tag pages
        tags.forEach(tag => {
          const tagPath = `/tags/${_.kebabCase(tag)}/`

          createPage({
            path: tagPath,
            component: path.resolve(`src/components/tags.js`),
            context: {
              tag,
            },
          })
        })
 
      })
    )
  })
}
