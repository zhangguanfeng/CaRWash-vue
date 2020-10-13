<template>
    <div>
         <div class="box">
            <el-page-header @back="$router.go(-1)" :content="$t('shopManagement').detail"></el-page-header>
        </div>
        <el-card class="content mt20">
            <el-form label-position="left" :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item :label="$t('shop')" prop="name">
                    <div>{{ruleForm.name}}</div>
                </el-form-item>
                <el-form-item :label="$t('address')" prop="address">
                    <div>{{ruleForm.address}}</div>
                </el-form-item>
                <el-form-item :label="$t('introduce')" prop="description">
                    <div>{{ruleForm.description}}</div>
                </el-form-item>
                <el-form-item :label="$t('phone')" prop="phone">
                    <div>{{ruleForm.phone}}</div>
                </el-form-item>
                <el-form-item :label="$t('shopManagement.scoped')" prop="area">
                    <div v-for="(item,index) in ruleForm.area" :key="index">{{item.name}}</div>
                </el-form-item>
                <el-form-item :label="$t('shopManagement.business')" prop="open_hours">
                    <div>{{ruleForm.open_hours}}</div>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>
<script>
import {getStore, getStoreDetail} from '@/api/api'
export default {
    name:'shopDetail',
    data(){
        return {
            ruleForm:{
                name: '',
                address: '',
                description: '',
                phone: '',
                area: '',
                open_hours: ''
            },
        }
    },
    computed:{
        id(){
			return Number.isNaN(Number(this.$route.query.id)) ? undefined : Number(this.$route.query.id)
        },
    },
    methods:{
        async get_info(){
            const information = await getStoreDetail(this.id)
            this.ruleForm = information
        }
    },
    created(){
        this.get_info()
    },
}
</script>
<style lang="scss" scoped>

</style>