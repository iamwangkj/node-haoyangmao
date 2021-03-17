const axios = require('axios')
const { jdCookie } = require('../config/cookie')

const service = axios.create({
  // baseURL: 'https://api.m.jd.com/',
  headers: {
    cookie: jdCookie
  }
})

service.interceptors.request.use(config => config, error => Promise.reject(error))

service.interceptors.response.use(
  res => {
    console.log('拦截器返回=', res.data)
    return res.data
  },
  error => {
    console.error('拦截器错误=', error)
    return Promise.reject(error)
  }
)

module.exports = service
