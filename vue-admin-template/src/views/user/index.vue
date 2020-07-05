<template>
	<div class="app-container">
		<div style="padding-bottom: 20px;">
			<el-button @click="add" type="primary" icon="el-icon-edit">添加用户</el-button>
		</div>
		<el-table v-loading="listLoading" :data="list" element-loading-text="Loading" border fit highlight-current-row>
			<el-table-column align="center" label="ID" width="95">
				<template slot-scope="scope">
					{{ scope.row.id }}
				</template>
			</el-table-column>
			<el-table-column label="用户名" width="150" align="center">
				<template slot-scope="scope">
					{{ scope.row.username }}
				</template>
			</el-table-column>
			<el-table-column label="邮箱" align="center">
				<template slot-scope="scope">
					<span>{{ scope.row.email }}</span>
				</template>
			</el-table-column>
			<el-table-column label="手机号码" align="center">
				<template slot-scope="scope">
					{{ scope.row.mobile }}
				</template>
			</el-table-column>
			<!-- 1正常使用，非1禁用 -->
			<el-table-column class-name="status-col" label="状态" width="110" align="center">
				<template slot-scope="scope">
					<el-tag :type="scope.row.status | statusFilter">{{ scope.row.status==1?"正常":"禁用"}}</el-tag>
				</template>
			</el-table-column>
			<el-table-column align="center" prop="created_at" label="操作" width="200">
				<template slot-scope="scope">
					<!-- 编辑 -->
					<el-button @click="edit(scope.row.id)" type="primary" icon="el-icon-edit" circle></el-button>
					<!-- 删除 -->
					<el-button @click="del(scope.row.id)" type="danger" icon="el-icon-delete" circle></el-button>
				</template>
			</el-table-column>
		</el-table>
		<div style="width: 100%;height: 100px;display: flex;justify-content:center;align-items: center;">
		<el-pagination background layout="prev, pager, next" :total=total @current-change="getPageUsers">
		</el-pagination>
		</div>
	</div>
</template>

<script>
	import {userlist,delUser} from '@/api/admin'

	export default {
		filters: {
			statusFilter(status) {
				const statusMap = {
					'1': 'success',
					'0': 'gray',
					'-1': 'danger'
				}
				return statusMap[status]
			}
		},
		data() {
			return {
				list: null,
				listLoading: true,
				total: 0
			}
		},
		created() {
			this.fetchData()
		},
		methods: {
			add() {
				this.$router.push({
					path:"/user/adduser",
				})
			},
			fetchData() {
				this.listLoading = true
				userlist().then(response => {
					this.list = response.userlist
					this.total = response.total
					console.log(response)
					this.listLoading = false
				})
			},
			getPageUsers(page) {
				console.log(page)
				userlist({page:page}).then(response => {
					this.list = response.userlist
					this.total = response.total
					console.log(response)
					this.listLoading = false
				})
			},
			async del(id) {
				this.$confirm(`此操作将永久删除用户${id}, 是否继续?`, '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				 }).then(async () => {
					this.listLoading = true;
					let res = await delUser({id})
					this.listLoading = false
					this.fetchData()
				})
			},
			edit(id) {
				this.$router.push({
					path:"/user/edituser",
					query:{id}
				})
			}
		},
	}
</script>
