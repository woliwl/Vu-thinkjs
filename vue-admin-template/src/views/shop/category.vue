<template>
	<div class="app-container">
		<div style="padding-bottom: 20px;">
			<el-button @click="add" type="primary" icon="el-icon-edit">添加分类</el-button>
		</div>
		<el-table v-loading="listLoading" :data="list" element-loading-text="Loading" border fit highlight-current-row>
			<el-table-column align="center" label="ID" width="120px">
				<template slot-scope="scope">
					{{ scope.row.id }}
				</template>
			</el-table-column>
			<el-table-column label="分类名称" align="center">
				<template slot-scope="scope">
					{{ scope.row.title }}
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
					<!-- 编辑 传递一整行的内容-->
					<el-button @click="edit(scope.row)" type="primary" icon="el-icon-edit" circle></el-button>
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
	import {categorylist,delcategory} from '@/api/shop'

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
					path:"/shop/addcategory",
				})
			},
			fetchData() {
				this.listLoading = true
				categorylist().then(response => {
					this.list = response.categorylist
					this.total = response.total
					console.log(response)
					this.listLoading = false
				})
			},
			getPageUsers(page) {
				console.log(page)
				categorylist({page:page}).then(response => {
					this.list = response.categorylist
					this.total = response.total
					console.log(response)
					this.listLoading = false
				})
			},
			async del(id) {
				this.$confirm(`此操作将永久删除分类${id}, 是否继续?`, '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				 }).then(async () => {
					this.listLoading = true;
					let res = await delcategory({id})
					this.listLoading = false
					this.fetchData()
				})
			},
			edit(category) {
				this.$router.push({
					path:"/shop/editcategory",
					query:category
				})
			}
		},
	}
</script>
