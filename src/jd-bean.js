const { jdCookie } = require('./config/cookie')
const axios = require('axios')
const _ = require('lodash')
// console.log('jdCookie=', jdCookie)

const resList = []

function addRes (task, result) {
  const item = {
    task,
    result: parseInt(result, 10) > 0 ? `获得京豆：${result}` : result
  }
  resList.push(item)
}

const axiosIns = axios.create({
  // baseURL: 'https://api.m.jd.com/',
  headers: {
    cookie: jdCookie
  }
})

async function bean () {
  const task = '京东京豆签到'
  try {
    const { data } = await axiosIns.get('https://api.m.jd.com/client.action?functionId=signBeanIndex&appid=ld')
    const beanCount = _.get(data, 'data.dailyAward.beanAward.beanCount')
    console.log('获得的京豆数=', beanCount)
    if (beanCount >= 0) {
      addRes(task, beanCount)
    } else {
      throw (Error('失败'))
    }
  } catch (err) {
    console.error('err=', err)
    addRes(task)
  }
}
// bean()

async function kanyikan () {
  const task = '发现-看一看'
  try {
    const { data } = await axiosIns.get('https://api.m.jd.com/client.action?functionId=discTaskList&body=%7B%22bizType%22%3A1%2C%22referPageId%22%3A%22discRecommend%22%7D&client=apple&clientVersion=9.1.6&openudid=1fce88cd05c42fe2b054e846f11bdf33f016d676&sign=17061147fe8e0eb10edfe8d9968b6d66&st=1601138337675&sv=102')
    const res = _.get(data, 'data.discTasks.0.taskTitle')
    const beanCount = res.replace(/[^0-9]/ig, '')
    console.log('获得的京豆数=', beanCount)
    if (beanCount >= 0) {
      addRes(task, beanCount)
    } else {
      throw (Error('失败'))
    }
  } catch (err) {
    console.error('err=', err.message)
    addRes(task)
  }
}
// kanyikan()

async function chaoshi () {
  const task = '京东超市'
  try {
    const { data } = await axios({
      headers: {
        cookie: jdCookie,
        Origin: 'https://jdsupermarket.jd.com'
      },
      url: 'https://api.m.jd.com/api?appid=jdsupermarket&functionId=smtg_sign&clientVersion=8.0.0&client=m&body=%7B%7D'
    })
    console.log('请求返回的数据=', data)
    // const beanCount = _.get(data, 'data.dailyAward.beanAward.beanCount')
    // console.log('获得的京豆数=', beanCount)
    if (_.get(data, 'data.success')) {
      addRes(task, 1)
    } else {
      const msg = _.get(data, 'data.bizMsg')
      throw (msg)
    }
  } catch (err) {
    console.error('err=', err)
    addRes(task, err.message)
  }
}
// chaoshi()

async function zhibo () {
  const task = '京东直播'
  try {
    const { data } = await axios({
      headers: {
        cookie: jdCookie,
        Origin: 'https://h.m.jd.com'
      },
      url: 'https://api.m.jd.com/api?functionId=getChannelTaskRewardToM&appid=h5-live&body=%7B%22type%22%3A%22signTask%22%2C%22itemId%22%3A%221%22%7D'
    })
    console.log('请求返回的数据=', data)
    // const beanCount = _.get(data, 'data.dailyAward.beanAward.beanCount')
    // console.log('获得的京豆数=', beanCount)
    if (data.subCode == 0) {
      addRes(task, 1)
    } else {
      throw (Error(data.msg))
    }
  } catch (err) {
    console.error('err=', err)
    addRes(task, err.message)
  }
}
// zhibo()

async function zhuanpan () {
  const task = '京东转盘'
  try {
    const { data } = await axiosIns.get('https://api.m.jd.com/client.action?functionId=wheelSurfIndex&body=%7B%22actId%22%3A%22jgpqtzjhvaoym%22%2C%22appSource%22%3A%22jdhome%22%7D&appid=ld')
    console.log('请求返回的数据=', data)
    // const beanCount = _.get(data, 'data.dailyAward.beanAward.beanCount')
    // console.log('获得的京豆数=', beanCount)
    // if (data.subCode == 0) {
    //   addRes(task, 1)
    // } else {
    //   throw (Error(data.msg))
    // }
  } catch (err) {
    console.error('err=', err)
    addRes(task, err.message)
  }
}
// zhuanpan()

async function shangou () {
  const task = '京东闪购'
  try {
    const { data } = await axiosIns.get('https://api.m.jd.com/client.action?functionId=partitionJdSgin&body=%7B%22version%22%3A%22v2%22%7D&client=apple&clientVersion=9.0.8&openudid=1fce88cd05c42fe2b054e846f11bdf33f016d676&sign=6768e2cf625427615dd89649dd367d41&st=1597248593305&sv=121')
    console.log('请求返回的数据=', data)
    const beanCount = _.get(data, 'result.jdBeanNum')
    console.log('获得的京豆数=', beanCount)
    if (beanCount > 0) {
      addRes(task, beanCount)
    } else {
      throw (Error('失败'))
    }
  } catch (err) {
    console.error('err=', err)
    addRes(task, err.message)
  }
}
// shangou()

async function guoji () {
  const task = '京东国际'
  try {
    const { data } = await axiosIns.get('https://api.m.jd.com/client.action?functionId=checkin&body=%7B%7D&build=167237&client=apple&clientVersion=9.0.0&openudid=1fce88cd05c42fe2b054e846f11bdf33f016d676&partner=apple&scope=11&sign=e27f8b904040a0e3c99b87fc27e09c87&st=1591730990449&sv=101')
    console.log('请求返回的数据=', data)
    // const beanCount = _.get(data, 'result.jdBeanNum')
    // console.log('获得的京豆数=', beanCount)
    // if (beanCount > 0) {
    //   addRes(task, beanCount)
    // } else {
    //   throw (Error('失败'))
    // }
  } catch (err) {
    console.error('err=', err)
    addRes(task, err.message)
  }
}
// guoji()

async function hongbao () {
  const task = '京东现金红包'
  try {
    const { data } = await axiosIns.get('https://api.m.jd.com/client.action?functionId=ccSignInNew&body=%7B%22pageClickKey%22%3A%22CouponCenter%22%2C%22eid%22%3A%22O5X6JYMZTXIEX4VBCBWEM5PTIZV6HXH7M3AI75EABM5GBZYVQKRGQJ5A2PPO5PSELSRMI72SYF4KTCB4NIU6AZQ3O6C3J7ZVEP3RVDFEBKVN2RER2GTQ%22%2C%22shshshfpb%22%3A%22v1%5C%2FzMYRjEWKgYe%2BUiNwEvaVlrHBQGVwqLx4CsS9PH1s0s0Vs9AWk%2B7vr9KSHh3BQd5NTukznDTZnd75xHzonHnw%3D%3D%22%2C%22childActivityUrl%22%3A%22openapp.jdmobile%253a%252f%252fvirtual%253fparams%253d%257b%255c%2522category%255c%2522%253a%255c%2522jump%255c%2522%252c%255c%2522des%255c%2522%253a%255c%2522couponCenter%255c%2522%257d%22%2C%22monitorSource%22%3A%22cc_sign_ios_index_config%22%7D&client=apple&clientVersion=8.5.0&d_brand=apple&d_model=iPhone8%2C2&openudid=1fce88cd05c42fe2b054e846f11bdf33f016d676&scope=11&screen=1242%2A2208&sign=1cce8f76d53fc6093b45a466e93044da&st=1581084035269&sv=102')
    console.log('请求返回的数据=', data)
    // const beanCount = _.get(data, 'result.jdBeanNum')
    // console.log('获得的京豆数=', beanCount)
    // if (beanCount > 0) {
    //   addRes(task, beanCount)
    // } else {
    //   throw (Error('失败'))
    // }
  } catch (err) {
    console.error('err=', err)
    addRes(task, err.message)
  }
}
// hongbao()

async function mofang () {
  const task = '京东魔方'
  const sign = 2
  try {
    const { data } = await axiosIns.get(`https://api.m.jd.com/client.action?functionId=getNewsInteractionInfo&appid=smfe${sign ? `&body=${encodeURIComponent(`{"sign":${sign}}`)}` : ''}`)
    console.log('请求返回的数据=', data)
    // const beanCount = _.get(data, 'result.jdBeanNum')
    // console.log('获得的京豆数=', beanCount)
    // if (beanCount > 0) {
    //   addRes(task, beanCount)
    // } else {
    //   throw (Error('失败'))
    // }
  } catch (err) {
    console.error('err=', err)
    addRes(task, err.message)
  }
}
// mofang()

async function jintie () {
  const task = '京东京贴'
  try {
    const { data } = await axios({
      headers: {
        Referer: 'https://active.jd.com/forever/cashback/index',
        Cookie: jdCookie
      },
      url: 'https://ms.jr.jd.com/gw/generic/uc/h5/m/signIn7'
    })
    console.log('请求返回的数据=', data)
    // const beanCount = _.get(data, 'result.jdBeanNum')
    // console.log('获得的京豆数=', beanCount)
    // if (beanCount > 0) {
    //   addRes(task, beanCount)
    // } else {
    //   throw (Error('失败'))
    // }
  } catch (err) {
    console.error('err=', err)
    addRes(task, err.message)
  }
}
// jintie()

async function lingxianjin () {
  const task = '京东领现金'
  try {
    const { data } = await axiosIns.get('https://api.m.jd.com/client.action?functionId=cash_sign&body=%7B%22remind%22%3A0%2C%22inviteCode%22%3A%22%22%2C%22type%22%3A0%2C%22breakReward%22%3A0%7D&client=apple&clientVersion=9.0.8&openudid=1fce88cd05c42fe2b054e846f11bdf33f016d676&sign=7e2f8bcec13978a691567257af4fdce9&st=1596954745073&sv=111')
    console.log('请求返回的数据=', data)
    // const beanCount = _.get(data, 'result.jdBeanNum')
    // console.log('获得的京豆数=', beanCount)
    // if (beanCount > 0) {
    //   addRes(task, beanCount)
    // } else {
    //   throw (Error('失败'))
    // }
  } catch (err) {
    console.error('err=', err)
    addRes(task, err.message)
  }
}
// lingxianjin()

async function yaoyiyao () {
  const task = '京东摇一摇'
  try {
    const { data } = await axiosIns.get('https://api.m.jd.com/client.action?appid=vip_h5&functionId=vvipclub_shaking')
    console.log('请求返回的数据=', data)
    // const beanCount = _.get(data, 'result.jdBeanNum')
    // console.log('获得的京豆数=', beanCount)
    // if (beanCount > 0) {
    //   addRes(task, beanCount)
    // } else {
    //   throw (Error('失败'))
    // }
  } catch (err) {
    console.error('err=', err)
    addRes(task, err.message)
  }
}
// yaoyiyao()

async function miaosha () {
  const task = '京东秒杀'
  try {
    const { data } = await axios({
      headers: {
        Cookie: jdCookie,
        Origin: 'https://h5.m.jd.com'
      },
      url: 'https://api.m.jd.com/client.action?functionId=freshManHomePage&body=%7B%7D&client=wh5&appid=SecKill2020'
    })
    console.log('请求返回的数据=', data)
    // const beanCount = _.get(data, 'result.jdBeanNum')
    // console.log('获得的京豆数=', beanCount)
    // if (beanCount > 0) {
    //   addRes(task, beanCount)
    // } else {
    //   throw (Error('失败'))
    // }
  } catch (err) {
    console.error('err=', err)
    addRes(task, err.message)
  }
}
// miaosha()

async function car (activityId) {
  const task = '京东汽车'
  try {
    const { data } = await axios({
      headers: {
        Cookie: jdCookie,
        ActivityId: activityId
      },
      url: 'https://cgame-stadium.jd.com/api/v1/first/login'
    })
    console.log('请求返回的数据=', data)
    // const beanCount = _.get(data, 'result.jdBeanNum')
    // console.log('获得的京豆数=', beanCount)
    // if (beanCount > 0) {
    //   addRes(task, beanCount)
    // } else {
    //   throw (Error('失败'))
    // }
  } catch (err) {
    console.error('err=', err)
    addRes(task, err.message)
  }
}
car('5fc3c1f2e91f46f09ab2b722e10d92bf')
