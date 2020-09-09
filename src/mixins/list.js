

import { clean } from "@/utils/object"

/**
 @description: table封装mixin
 @param {Promise} axios_get  axios请求函数
 @returns {Object} mixin对象
**/



export const mixin_list = (axios_get,config={}) => {
	return {
		data() {
			return {
				list_data: {
					list: [],
					total: 0
				},
				page:1,
				pageSize:20,
				selete: [],
				ordering: "",
				...config
			}
		},
		methods: {
			allSelect(val) {
				this.selete = val;
			},
			sort_change({ prop, order }) { //ascending 升 id
				if (order === null) {
					this.ordering = ''
					return
				}
				this.ordering = order === "ascending" ? prop : `-${prop}`;
			},
			async get_list() {
				const { pageSize, page } = this;
				const filter = this.filter
				const data = clean({
					limit:pageSize,
					cursor:page,
					...filter,
					order:this.ordering
				})
				const { list, total } = await axios_get(data)
				this.list_data = {
					list: list,
					total: total
				};
			}
		},
		computed: {
			get_select() {
				return this.selete.map(x => x.id)
			}
		},
		watch: {
			page(){
				this.get_list();
			},
			pageSize(){
				this.get_list();
			},
			ordering() {
				this.get_list();
			}
		},
		created() {
			this.get_list();
		}
	}
}
