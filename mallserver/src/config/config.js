// default config
module.exports = {
  workers: 1,
  // 配置JWT
  jwt:{
	  // 口令加密
	  secret:"wenlimei-password",
	  cookie:'jwt-token',
	  expire:30000  // 口令有效时间
  },
  
  hostIpPort:"http://127.0.0.1:8360"
};
