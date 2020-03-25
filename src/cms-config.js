const contentful = require('contentful')
const contentManage = require('contentful-management')


export const client = contentful.createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN
})

export const clientManage = contentManage.createClient({
  accessToken: process.env.CONTENTFUL_MANAGE_TOKEN
})