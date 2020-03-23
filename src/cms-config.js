const contentful = require('contentful')
const contentManage = require('contentful-management')

export const client = contentful.createClient({
  space: '3uaeu4rxc51m',
  accessToken: 'klyMztikgtixidQzIqUmLOdySOM2MPvzmXN_gM17LT8'
})

export const clientManage = contentManage.createClient({
  accessToken: 'CFPAT-nVjBYI3YBDGA9AWFg_SxJhR2uZ-mRTX5pp9RLfB0XZ8'
})