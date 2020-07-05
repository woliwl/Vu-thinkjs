const Base = require('../base.js');

// 步骤1：
module.exports = class extends Base {
	// 权限认证
	__before() {
		return this.checkAuth()
	}
	
	indexAction() {
	// 获取用户信息页面
		return this.json({msg:"admin page"})
	}

	async userInfoAction(){
	  let username = this.ctx.state.username;
	  // let user = await this.model('member').where({username:username}).find()
	  // 用户权限配置
	  let user = await this.model('member').where({'cmswing_member.username':username})
	     .join({
	         table:'auth_user_role',
	         join:"left",
	         as:'l',
	         on:['id','user_id']
	     })
	     .join({
	         table:'auth_role',
	         join:"left",
	         as:'c',
	         on:['l.role_id','id']
	     }).field('username,desc,password,mobile,email,role_id,rule_ids').find()
	  
	  let rulelist = await this.model('auth_rule').order('id').select();
	  
	  // 头像路径
	  let filepath = think.ROOT_PATH + '/www/static/image/avatar/avatar' + user.id
	  
	  // 如果有该文件就进行头像配置
	  if(think.isFile(filepath)){
		  user.avatar = this.config('hostIpPort') + '/static/image/avatar/avatar' + user.id + '.png'
	  }else{
		  // 如果没有该文件,使用默认头像
		  user.avatar = this.config('hostIpPort') + '/static/image/avatar/avatar1.jpg'
	  }
	  
	 
	  
	  
	  return this.json({userinfo:user,rulelist})
	}
};
