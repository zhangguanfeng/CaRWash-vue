<template>
    <div>
         <div class="box">
            <el-page-header @back="$router.go(-1)" :content="$t('serviceApplication').detail"></el-page-header>
        </div>
        <el-card class="content mt20">
            <el-form label-position="left" :model="ruleForm" ref="ruleForm" label-width="120px" class="demo-ruleForm">
                <el-form-item :label="$t('serviceApplication.create_time')" prop="create_time">
                    <div>{{ruleForm.create_time}}</div>
                </el-form-item>
                 <el-form-item :label="$t('serviceApplication.userAccount')" prop="userAccount">
                    <div>{{ruleForm.user.account}}</div>
                </el-form-item>
                <el-form-item :label="$t('serviceApplication.userPhone')" prop="userPhone">
                    <div>{{ruleForm.user.phone}}</div>
                </el-form-item>
                <el-form-item :label="$t('serviceApplication.store')" prop="store">
                    <div>{{ruleForm.store}}</div>
                </el-form-item>
                <el-form-item :label="$t('serviceApplication.areaName')" prop="areaName">
                    <div>{{ruleForm.area.name}}</div>
                </el-form-item>
                <el-form-item :label="$t('serviceApplication.childrenName')" prop="service">
                    <div>{{ruleForm.area.children.name}}</div>
                </el-form-item>
                <el-form-item :label="$t('serviceApplication.car_name')" prop="car_name">
                    <div>{{ruleForm.car_name}}</div>
                </el-form-item>
                <el-form-item :label="$t('serviceApplication.car_number')" prop="car_number">
                    <div>{{ruleForm.car_number}}</div>
                </el-form-item>
                <el-form-item :label="$t('serviceApplication.car_color')" prop="car_color">
                    <div>{{ruleForm.car_color}}</div>
                </el-form-item>
                <el-form-item :label="$t('serviceApplication.car_brand')" prop="car_brand">
                    <div>{{ruleForm.car_brand}}</div>
                </el-form-item>
                 <el-form-item :label="$t('serviceApplication.car_time')" prop="car_time">
                    <div>{{ruleForm.car_time}}</div>
                </el-form-item>
                <el-form-item :label="$t('serviceApplication.address')" prop="address">
                    <div>{{ruleForm.address}}</div>
                </el-form-item>
                <el-form-item :label="$t('serviceApplication.address_detail')" prop="address_detail">
                    <div>{{ruleForm.address_detail}}</div>
                </el-form-item>
                 <el-form-item :label="$t('serviceApplication.address_code')" prop="address_code">
                    <div>{{ruleForm.address_code}}</div>
                </el-form-item>
                <el-form-item :label="$t('serviceApplication.car_type')" prop="car_type">
                    <div>{{ruleForm.car_type}}</div>
                </el-form-item>
                    <el-form-item :label="$t('serviceApplication.dayOfWeek')" prop="day_of_week">
                    <div v-for="(item,index) in ruleForm.day_of_week" :key="index">{{item}}</div>
                </el-form-item>
                <el-form-item :label="$t('serviceApplication.staff')" prop="staffAccount">
                    <div>{{ruleForm.staff.account}}</div>
                </el-form-item>
                <el-form-item :label="$t('serviceApplication.userPhone')" prop="staffPhone">
                    <div>{{ruleForm.staff.phone}}</div>
                </el-form-item>
                <el-form-item :label="$t('serviceApplication.amount')" prop="amount">
                    <div>{{ruleForm.amount}}</div>
                </el-form-item>
                 <el-form-item :label="$t('serviceApplication.remark')" prop="remark">
                    <div>{{ruleForm.remark}}</div>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>
<script>
import {getOrderDetail} from '@/api/api'
export default {
    name:'orderDetail',
    data(){
        return {
            ruleForm:{
                id:'',
                create_time: "",
                car_name: "",
                car_number: "",
                car_color: "",
                car_brand: "",
                car_time: "",
                remark: "",
                address: "",
                address_code: "",
                address_detail: "",
                active: '',
                user: {
                    id: '',
                    account: "",
                    phone: ""
                },
                store: "",
                area: {
                    id: '',
                    name: "",
                    children: {
                        id: '',
                        name: ""
                    }
                },
                service: "",
                car_type: "",
                day_of_week: [
                    
                ],
                staff: {
                    id: '',
                    account: "",
                    phone: ""
                },
                amount: ''
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
            const information = await getOrderDetail(this.id)
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