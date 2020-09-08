<template>
    <div class="pagin">
        <el-pagination
            @size-change="sizeChange"
            @current-change="currentChange"
            :page-sizes="[10, 20, 50, 100]"
            :page-size="page_size"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
        ></el-pagination>
    </div>
</template>

<script>
export default {
	props:{
		total:{
			required:false,
			type:Number
		},
		page_size:{
			required:false,
			type:Number
		},
		page:{
			required:false,
			type:Number
		}
	},
    methods: {
        sizeChange(val) {
			this.$emit('update:page_size',val)
        },
        currentChange(val) {
			this.$emit('update:page',val)
        }
	}
};
</script>

<style lang = 'scss'>
.pagin {
    padding: 10px 0;
    text-align: right;
}
</style>
