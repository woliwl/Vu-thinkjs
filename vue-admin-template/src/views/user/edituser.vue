<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="用户名">
        <el-input v-model="form.username" :disabled="true"/>
      </el-form-item>
	  <el-form-item label="密码">
	    <el-input v-model="form.password" placeholder="如不修改密码请置空"/>
	  </el-form-item>
	  <el-form-item label="邮箱">
	    <el-input v-model="form.email" />
	  </el-form-item>
	  <el-form-item label="电话号码">
	    <el-input v-model="form.mobile" />
	  </el-form-item>
      <el-form-item label="管理员角色选择">
        <el-select v-model="form.role_id" placeholder="please select your zone">
          <el-option v-for="(item,index) in rolelist" :key="index" :label="item.desc" :value="item.id" />
        </el-select>
      </el-form-item>
	  <el-form-item>
	      <el-button type="primary" @click="onSubmit">修改</el-button>
	      <el-button @click="onCancel">取消</el-button>
	  </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {userinfo,rolelist,updateuser} from '@/api/admin'
export default {
  data() {
    return {
      form: {
        username:"",
		password:"",
		email:"",
		mobile:"",
		role_id:""
      },
	  role_id:"",
	  rolelist:[]
    }
  },
  async created(){
	let userid = this.$route.query.id;
	// console.log(userid);
	let res = await userinfo({id:userid});
	 this.form.username = res.user.username;
	 this.form.mobile = res.user.mobile;
	 this.form.email = res.user.email;
	 this.form.role_id = res.user.role_id;
	 this.form.id = userid;
	 this.role_id = res.user.role_id;
  },
  methods: {
    onSubmit() {
      this.$message('修改成功')
	  // 提交
	  updateuser(this.form)
	  this.$router.push('/user/userlist');
    },
    onCancel() {
      this.$message({
        message: '取消操作',
        type: 'warning'
      })
	this.$router.push('/user/userlist');
    }
  },
  async beforeMount(){
	let res = await rolelist()
	this.rolelist = res.rolelist
  }
}
</script>

<style scoped>
.line{
  text-align: center;
}
</style>

