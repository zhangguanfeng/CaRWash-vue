<template>
    <div>
        <div class="box bbb" style="margin-bottom: 15px;">
            <h1 v-if="type==='check'" class="useName">{{info.name}}</h1>
            <el-input v-else v-model="info.name" />
			<br>
            <br>
			<editor v-model="info.content" />
			<el-button v-if="type==='edit'" class="btn" type="primary" @click="save">保存</el-button>
        </div>
    </div>
</template>
<script>
import editor from "@/components/editor";
import {getServiceTermDetail,editServiceTerm} from '@/api/api'
export default {
    name:'useEdit',
    data(){
        return {
            id:'',
            info:{
                id:'',
                name:'',
                content:''
			}
        }
    },
    components:{editor},
    created(){
        this.id=this.$route.query.id
        this.type=this.$route.query.type
        this.get_info(this.id)
    },
    methods:{
        async get_info(id){
            const res = await getServiceTermDetail(id)
            this.info=res
        },
        async save(){
            const res=await editServiceTerm(this.info)
            if(res.errcode===2000){
                this.$message.success({
                    message:this.$t('changeSuccess')
                })
                this.$router.back(-1)
            }
        }
    },
}
</script>
<style land="scss" scoped>
.bbb{
	position: relative;
	padding-bottom: 50px;
}
.bbb .btn{
	position: absolute;
	bottom:3px;
	right: 20px;
}
.useName{
    text-align: center;
    font-weight: bold;
    font-size: 20px;
}
</style>
