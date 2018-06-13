/* oncall 项目地址（config示例） */
import tld from 'tldjs'

const HOST = window.location.host

const config = {
  'prod': {
    origin: '//wms.isesol.com',
    api: '//api.isesol.com',
    fileFTP: '//oncall.isesol.com/oncallapi',
    qiNiu: '//upload.qbox.me/'
  },
  'pre': {
    origin: '//wms.preisesol.com',
    api: '//api.preisesol.com',
    fileFTP: '//oncall.preisesol.com/oncallapi',
    qiNiu: '//upload.qbox.me/'
  },
  'test': {
    origin: '//wms.i5sesol.com',
    api: '//api.i5sesol.com',
    fileFTP: '//oncall.i5sesol.com/oncallapi',
    qiNiu: '//upload.qbox.me/'
  },
  'dev': {
    origin: '//wms.isesoldev.com',
    api: '//api.isesoldev.com',
    fileFTP: '//oncall.isesoldev.com/oncallapi',
    qiNiu: '//upload.qiniu.com/'
  }
}

// 获取域名
function createDomain (host) {
  let DOMAIN = {}
  let topDomain = tld.getDomain(host)
  // console.log('topDomain', topDomain)
  if (topDomain === 'isesol.com') {
    DOMAIN = config['prod']
  } else if (topDomain === 'preisesol.com') {
    DOMAIN = config['pre']
  } else if (topDomain === 'i5sesol.com') {
    DOMAIN = config['test']
  } else {
    DOMAIN = config['dev']
  }
  DOMAIN.tld = topDomain
  DOMAIN.apiPath = DOMAIN.api + '/cgi'
  return DOMAIN
}

export const DOMAIN = createDomain(HOST)
export const TOKEN_NAME = 'token'
