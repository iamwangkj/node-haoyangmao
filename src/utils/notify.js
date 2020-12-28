const axios = require('axios')

function notify (title = '我是标题', content = '我是内容') {
  return axios.get('https://sc.ftqq.com/SCU140073T6de793a72619a8d35042f582c78649d55fe950d67fc3b.send', {
    params: {
      text: title,
      desp: content
    }
  }).then((res) => {
    console.log('res=', res.data)
    if (res.data.errno === 0) {
      console.log('方糖推送信息成功')
    }
  })
}
// notify('asdf', 'asdf')

module.exports = notify
